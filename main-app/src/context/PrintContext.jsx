import React from 'react'; // Add this line
import { createContext, useContext, useEffect, useState } from "react";

import { db, storage } from "../firebase";
import { useAuth } from "./AuthContext";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot, 
  doc,
  runTransaction
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const PrintContext = createContext();

export function PrintProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [queue, setQueue] = useState([]);
  const [currentToken, setCurrentToken] = useState(null);
  const { user } = useAuth();

  // Get next token number
  const getNextToken = async () => {
    const settingsRef = doc(db, "settings", "queueSettings");
    try {
      let tokenNumber;
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(settingsRef);
        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }
        tokenNumber = sfDoc.data().lastToken + 1;
        transaction.update(settingsRef, { lastToken: tokenNumber });
      });
      return tokenNumber;
    } catch (e) {
      console.error("Transaction failed: ", e);
      return null;
    }
  };

  // Submit a new print job
  const submitPrintJob = async (file, copies = 1, options = {}) => {
    if (!user || !file) return;
    
    // Upload file to storage
    const storageRef = ref(storage, `prints/${user.uid}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const fileUrl = await getDownloadURL(storageRef);

    // Get token number
    const tokenNumber = await getNextToken();
    if (!tokenNumber) return;

    // Add to queue
    const jobData = {
      userId: user.uid,
      userName: user.email,
      fileName: file.name,
      fileUrl,
      tokenNumber,
      status: "waiting",
      copies,
      options,
      createdAt: new Date(),
    };

    await addDoc(collection(db, "queue"), jobData);
    return tokenNumber;
  };

  // Load user's jobs
  useEffect(() => {
    if (!user) return;
    
    const q = query(collection(db, "queue"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userJobs = [];
      snapshot.forEach((doc) => {
        userJobs.push({ id: doc.id, ...doc.data() });
      });
      setJobs(userJobs);
    });

    return () => unsubscribe();
  }, [user]);

  // Load entire queue
  useEffect(() => {
    const q = query(collection(db, "queue"), where("status", "in", ["waiting", "printing"]));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const queueData = [];
      snapshot.forEach((doc) => {
        queueData.push({ id: doc.id, ...doc.data() });
      });
      setQueue(queueData.sort((a, b) => a.tokenNumber - b.tokenNumber));
    });

    return () => unsubscribe();
  }, []);

  // Load current token being printed
  useEffect(() => {
    const q = query(collection(db, "queue"), where("status", "==", "printing"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setCurrentToken(null);
      } else {
        setCurrentToken(snapshot.docs[0].data().tokenNumber);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    jobs,
    queue,
    currentToken,
    submitPrintJob,
  };

  return <PrintContext.Provider value={value}>{children}</PrintContext.Provider>;
}

export function usePrint() {
  return useContext(PrintContext);
}