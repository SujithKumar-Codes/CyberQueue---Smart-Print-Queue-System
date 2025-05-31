// import React from "react";
// import { usePrint } from "../context/PrintContext";

// export function UserJobs() {
//   const { jobs, queue, currentToken } = usePrint();

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "completed":
//         return "green";
//       case "printing":
//         return "blue";
//       case "waiting":
//         return "orange";
//       default:
//         return "gray";
//     }
//   };

//   const getPositionInQueue = (tokenNumber) => {
//     if (!queue.length || !tokenNumber) return "-";
//     const waitingJobs = queue.filter(job => job.status === "waiting");
//     const position = waitingJobs.findIndex(job => job.tokenNumber === tokenNumber) + 1;
//     return position > 0 ? position : "-";
//   };

//   return (
//     <div className="user-jobs">
//       <h2>Your Print Jobs</h2>
      
//       <div className="queue-status">
//         <h3>Current Status</h3>
//         <p>Now printing: <strong>{currentToken || "None"}</strong></p>
//       </div>

//       {jobs.length === 0 ? (
//         <p>No print jobs submitted yet.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Token</th>
//               <th>File</th>
//               <th>Status</th>
//               <th>Position</th>
//               <th>Submitted</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobs.map((job) => (
//               <tr key={job.id}>
//                 <td>{job.tokenNumber}</td>
//                 <td>{job.fileName}</td>
//                 <td>
//                   <span className={`status ${getStatusColor(job.status)}`}>
//                     {job.status}
//                   </span>
//                 </td>
//                 <td>
//                   {job.status === "waiting" ? getPositionInQueue(job.tokenNumber) : "-"}
//                 </td>
//                 <td>{new Date(job.createdAt?.seconds * 1000).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// =======================================================================================================

// import React from "react";
// import { usePrint } from "../context/PrintContext";

// export function UserJobs() {
//   const { jobs, queue, currentToken } = usePrint();

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "completed":
//         return "#4CAF50"; // green
//       case "printing":
//         return "#2196F3"; // blue
//       case "waiting":
//         return "#FF9800"; // orange
//       default:
//         return "#9E9E9E"; // gray
//     }
//   };

//   const getPositionInQueue = (tokenNumber) => {
//     if (!queue.length || !tokenNumber) return "-";
//     const waitingJobs = queue.filter(job => job.status === "waiting");
//     const position = waitingJobs.findIndex(job => job.tokenNumber === tokenNumber) + 1;
//     return position > 0 ? position : "-";
//   };

//   return (
//     <div style={{
//       padding: "20px",
//       borderRadius: "10px",
//       backgroundColor: "#f5f5f5",
//       boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//       margin: "20px 0"
//     }}>
//       <h2 style={{
//         color: "#3F51B5",
//         borderBottom: "2px solid #3F51B5",
//         paddingBottom: "10px",
//         marginBottom: "20px"
//       }}>Your Print Jobs</h2>
      
//       <div style={{
//         backgroundColor: "#E3F2FD",
//         padding: "15px",
//         borderRadius: "8px",
//         marginBottom: "20px",
//         borderLeft: "5px solid #2196F3"
//       }}>
//         <h3 style={{ color: "#0D47A1", marginTop: "0" }}>Current Status</h3>
//         <p style={{ fontSize: "18px", marginBottom: "0" }}>
//           Now printing: <strong style={{ color: "#E91E63" }}>{currentToken || "None"}</strong>
//         </p>
//       </div>

//       {jobs.length === 0 ? (
//         <p style={{
//           backgroundColor: "#FFF8E1",
//           padding: "15px",
//           borderRadius: "8px",
//           color: "#FF6D00",
//           textAlign: "center"
//         }}>No print jobs submitted yet.</p>
//       ) : (
//         <table style={{
//           width: "100%",
//           borderCollapse: "collapse",
//           borderRadius: "8px",
//           overflow: "hidden",
//           boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
//         }}>
//           <thead>
//             <tr style={{
//               backgroundColor: "#3F51B5",
//               color: "white"
//             }}>
//               <th style={{ padding: "12px", textAlign: "left" }}>Token</th>
//               <th style={{ padding: "12px", textAlign: "left" }}>File</th>
//               <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
//               <th style={{ padding: "12px", textAlign: "left" }}>Position</th>
//               <th style={{ padding: "12px", textAlign: "left" }}>Submitted</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobs.map((job) => (
//               <tr key={job.id} style={{
//                 backgroundColor: "white",
//                 borderBottom: "1px solid #e0e0e0",
//                 transition: "all 0.3s ease",
//                 ":hover": {
//                   backgroundColor: "#F5F5F5",
//                   transform: "scale(1.01)",
//                   boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
//                 }
//               }}>
//                 <td style={{ padding: "12px", fontWeight: "bold" }}>{job.tokenNumber}</td>
//                 <td style={{ padding: "12px" }}>{job.fileName}</td>
//                 <td style={{ padding: "12px" }}>
//                   <span style={{
//                     display: "inline-block",
//                     padding: "4px 8px",
//                     borderRadius: "12px",
//                     color: "white",
//                     backgroundColor: getStatusColor(job.status),
//                     fontWeight: "bold",
//                     fontSize: "0.8em"
//                   }}>
//                     {job.status}
//                   </span>
//                 </td>
//                 <td style={{ padding: "12px" }}>
//                   {job.status === "waiting" ? (
//                     <span style={{
//                       display: "inline-block",
//                       width: "24px",
//                       height: "24px",
//                       lineHeight: "24px",
//                       borderRadius: "50%",
//                       backgroundColor: "#FF9800",
//                       color: "white",
//                       textAlign: "center",
//                       fontWeight: "bold"
//                     }}>
//                       {getPositionInQueue(job.tokenNumber)}
//                     </span>
//                   ) : "-"}
//                 </td>
//                 <td style={{ padding: "12px", color: "#616161" }}>
//                   {new Date(job.createdAt?.seconds * 1000).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


// =======================================================================================================


import React, { useEffect, useState } from "react";
import { usePrint } from "../context/PrintContext";

export function UserJobs() {
  const { jobs, queue, currentToken } = usePrint();
  const [completedJob, setCompletedJob] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [notifiedJobs, setNotifiedJobs] = useState(new Set());

  // Fixed alert effect - only triggers for new completions
  useEffect(() => {
    const newCompletedJobs = jobs.filter(
      job => job.status === "completed" && !notifiedJobs.has(job.id)
    );

    if (newCompletedJobs.length > 0) {
      const latestCompleted = newCompletedJobs[newCompletedJobs.length - 1];
      setCompletedJob(latestCompleted);
      setShowAlert(true);
      setNotifiedJobs(prev => new Set(prev).add(latestCompleted.id));
    }
  }, [jobs, notifiedJobs]);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#4CAF50"; // green
      case "printing":
        return "#2196F3"; // blue
      case "waiting":
        return "#FF9800"; // orange
      default:
        return "#9E9E9E"; // gray
    }
  };

  const getPositionInQueue = (tokenNumber) => {
    if (!queue.length || !tokenNumber) return "-";
    const waitingJobs = queue.filter(job => job.status === "waiting");
    const position = waitingJobs.findIndex(job => job.tokenNumber === tokenNumber) + 1;
    return position > 0 ? position : "-";
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Custom Styled Alert */}
      {showAlert && (
        <>
          <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            zIndex: 1000,
            width: "350px",
            textAlign: "center",
            borderTop: "5px solid #4CAF50"
          }}>
            <h3 style={{ 
              color: "#4CAF50",
              marginTop: 0,
              fontSize: "20px"
            }}>Printing Completed!</h3>
            <p style={{ margin: "15px 0" }}>
              <strong>File:</strong> {completedJob?.fileName}<br />
              <strong>Token:</strong> {completedJob?.tokenNumber}
            </p>
            <button 
              onClick={() => setShowAlert(false)}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "background-color 0.3s",
                ":hover": {
                  backgroundColor: "#45a049"
                }
              }}
            >
              OK
            </button>
          </div>
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999
          }}></div>
        </>
      )}

      {/* Your Existing Content */}
      <div style={{
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#f5f5f5",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        margin: "20px 0"
      }}>
        <h2 style={{
          color: "#3F51B5",
          borderBottom: "2px solid #3F51B5",
          paddingBottom: "10px",
          marginBottom: "20px"
        }}>Your Print Jobs</h2>
        
        <div style={{
          backgroundColor: "#E3F2FD",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
          borderLeft: "5px solid #2196F3"
        }}>
          <h3 style={{ color: "#0D47A1", marginTop: "0" }}>Current Status</h3>
          <p style={{ fontSize: "18px", marginBottom: "0" }}>
            Now printing: <strong style={{ color: "#E91E63" }}>{currentToken || "None"}</strong>
          </p>
        </div>

        {jobs.length === 0 ? (
          <p style={{
            backgroundColor: "#FFF8E1",
            padding: "15px",
            borderRadius: "8px",
            color: "#FF6D00",
            textAlign: "center"
          }}>No print jobs submitted yet.</p>
        ) : (
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <thead>
              <tr style={{
                backgroundColor: "#3F51B5",
                color: "white"
              }}>
                <th style={{ padding: "12px", textAlign: "left" }}>Token</th>
                <th style={{ padding: "12px", textAlign: "left" }}>File</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Position</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} style={{
                  backgroundColor: "white",
                  borderBottom: "1px solid #e0e0e0",
                  transition: "all 0.3s ease"
                }}>
                  <td style={{ padding: "12px", fontWeight: "bold" }}>{job.tokenNumber}</td>
                  <td style={{ padding: "12px" }}>{job.fileName}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      color: "white",
                      backgroundColor: getStatusColor(job.status),
                      fontWeight: "bold",
                      fontSize: "0.8em"
                    }}>
                      {job.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    {job.status === "waiting" ? (
                      <span style={{
                        display: "inline-block",
                        width: "24px",
                        height: "24px",
                        lineHeight: "24px",
                        borderRadius: "50%",
                        backgroundColor: "#FF9800",
                        color: "white",
                        textAlign: "center",
                        fontWeight: "bold"
                      }}>
                        {getPositionInQueue(job.tokenNumber)}
                      </span>
                    ) : "-"}
                  </td>
                  <td style={{ padding: "12px", color: "#616161" }}>
                    {new Date(job.createdAt?.seconds * 1000).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}