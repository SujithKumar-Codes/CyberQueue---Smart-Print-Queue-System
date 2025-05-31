import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Paper, Grid, Card, CardContent, LinearProgress, Button, TextField, Select, MenuItem, FormControl, InputLabel, Alert, Snackbar, Container } from '@mui/material';
import { Print, CheckCircle, HourglassEmpty, Error, Settings, Refresh } from '@mui/icons-material';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

// Initial printers data
const initialPrinters = [
  { id: 1, name: 'Printer 1', inkLevel: 80, paperCount: 150, status: 'idle', lastMaintenance: '2023-05-15' },
  { id: 2, name: 'Printer 2', inkLevel: 75, paperCount: 120, status: 'idle', lastMaintenance: '2023-05-10' },
  { id: 3, name: 'Printer 3', inkLevel: 90, paperCount: 200, status: 'idle', lastMaintenance: '2023-05-18' },
  { id: 4, name: 'Printer 4', inkLevel: 60, paperCount: 80, status: 'idle', lastMaintenance: '2023-05-05' },
  { id: 5, name: 'Printer 5', inkLevel: 50, paperCount: 100, status: 'idle', lastMaintenance: '2023-05-20' }
];

const App = () => {
  // State management
  const [queue, setQueue] = useState([]);
  const [settings, setSettings] = useState({ currentToken: 1, lastToken: 1 });
  const [printers, setPrinters] = useState(initialPrinters);
  const [selectedPrinter, setSelectedPrinter] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [currentPrintJobs, setCurrentPrintJobs] = useState([]);
  const [newTokenNumber, setNewTokenNumber] = useState(1);

  // Fetch queue data and settings
  useEffect(() => {
    const q = query(collection(db, "queue"));
    const unsubscribeQueue = onSnapshot(q, (querySnapshot) => {
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().createdAt?.toDate?.().toLocaleString() || 'N/A',
        assignedPrinter: doc.data().assignedPrinter || null
      }));
      setQueue(items);
    });

    const fetchSettings = async () => {
      try {
        const docRef = doc(db, "settings", "system");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSettings(data);
          setNewTokenNumber(data.currentToken + 1); // Set next token number
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();

    return () => {
      unsubscribeQueue();
    };
  }, []);

  // Show alert
  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertOpen(true);
  };

  // Handle alert close
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  // Generate new token
  const generateNewToken = async () => {
    try {
      const docRef = doc(db, "settings", "system");
      const newToken = settings.currentToken + 1;
      
      await updateDoc(docRef, { 
        currentToken: newToken,
        lastToken: settings.currentToken
      });
      
      // Update local state
      setSettings(prev => ({
        currentToken: newToken,
        lastToken: prev.currentToken
      }));
      setNewTokenNumber(newToken + 1);
      
      showAlert(`New token generated: ${newToken}`);
    } catch (error) {
      console.error("Error generating token:", error);
      showAlert('Failed to generate token');
    }
  };

  // Find available printer
  const findAvailablePrinter = () => {
    return printers.find(p => 
      p.status === 'idle' && 
      p.inkLevel > 0 && 
      p.paperCount >= 10
    );
  };

  // Update printer resources
  const updatePrinterResources = (printerId) => {
    setPrinters(prev => prev.map(p => {
      if (p.id === printerId) {
        return {
          ...p,
          inkLevel: Math.max(0, p.inkLevel - 1),
          paperCount: Math.max(0, p.paperCount - 10),
          status: p.paperCount <= 10 || p.inkLevel <= 1 ? 'maintenance' : p.status
        };
      }
      return p;
    }));
  };

  // Start print job
  const startPrintJob = async (jobId, printerId) => {
    try {
      // Update queue item
      const docRef = doc(db, "queue", jobId);
      await updateDoc(docRef, { 
        status: 'printing',
        assignedPrinter: printerId
      });

      // Update printer status
      setPrinters(prev => prev.map(p => 
        p.id === printerId ? { ...p, status: 'printing' } : p
      ));

      // Add to current print jobs
      const newPrintJob = {
        jobId,
        printerId,
        completionTime: Date.now() + 30000 // 30 seconds from now
      };
      setCurrentPrintJobs(prev => [...prev, newPrintJob]);

      showAlert(`Print job assigned to Printer ${printerId}`);
    } catch (error) {
      console.error("Error starting print job:", error);
      showAlert('Failed to start print job');
    }
  };

  // Complete print job
  const completePrintJob = async (jobId, printerId) => {
    try {
      // Update queue item
      const docRef = doc(db, "queue", jobId);
      await updateDoc(docRef, { 
        status: 'completed'
      });

      // Update printer status and resources
      setPrinters(prev => prev.map(p => {
        if (p.id === printerId) {
          const newInk = Math.max(0, p.inkLevel - 1);
          const newPaper = Math.max(0, p.paperCount - 10);
          return {
            ...p,
            inkLevel: newInk,
            paperCount: newPaper,
            status: newPaper === 0 || newInk === 0 ? 'maintenance' : 'idle'
          };
        }
        return p;
      }));

      // Remove from current print jobs
      setCurrentPrintJobs(prev => prev.filter(job => job.jobId !== jobId));

      // Show alert if printer needs maintenance
      const printer = printers.find(p => p.id === printerId);
      if (printer.paperCount <= 10 || printer.inkLevel <= 1) {
        showAlert(`Printer ${printerId} needs maintenance (low ink or paper)`);
      }
    } catch (error) {
      console.error("Error completing print job:", error);
      showAlert('Failed to complete print job');
    }
  };

  // Check for completed print jobs
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const completedJobs = currentPrintJobs.filter(job => job.completionTime <= now);
      
      if (completedJobs.length > 0) {
        completedJobs.forEach(job => {
          completePrintJob(job.jobId, job.printerId);
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPrintJobs]);

  // Update print status
  const updatePrintStatus = async (id, status) => {
    try {
      const availablePrinter = findAvailablePrinter();
      
      if (!availablePrinter) {
        showAlert('No available printers with sufficient resources');
        return;
      }

      await startPrintJob(id, availablePrinter.id);
    } catch (error) {
      console.error("Error updating status:", error);
      showAlert('Failed to update print status');
    }
  };

  // Manually assign printer
  const manuallyAssignPrinter = async (jobId) => {
    if (!selectedPrinter) {
      showAlert('Please select a printer first');
      return;
    }

    const printer = printers.find(p => p.id === selectedPrinter);
    
    if (printer.status !== 'idle') {
      showAlert(`Printer ${selectedPrinter} is not available`);
      return;
    }

    if (printer.paperCount < 10) {
      showAlert(`Printer ${selectedPrinter} doesn't have enough paper`);
      return;
    }

    if (printer.inkLevel <= 0) {
      showAlert(`Printer ${selectedPrinter} doesn't have enough ink`);
      return;
    }

    await startPrintJob(jobId, selectedPrinter);
    setSelectedPrinter('');
  };

  // Refresh data
  const refreshData = () => {
    window.location.reload();
  };

  // Chart data preparation
  const statusData = {
    labels: ['Waiting', 'Printing', 'Completed'],
    datasets: [{
      label: 'Print Jobs',
      data: [
        queue.filter(item => item.status === 'waiting').length,
        queue.filter(item => item.status === 'printing').length,
        queue.filter(item => item.status === 'completed').length
      ],
      backgroundColor: [
        'rgba(255, 206, 86, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(75, 192, 192, 0.7)'
      ],
      borderColor: [
        'rgba(255, 206, 86, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1,
    }],
  };

  const printerHealthData = {
    labels: printers.map(p => p.name),
    datasets: [
      {
        label: 'Ink Level (%)',
        data: printers.map(p => p.inkLevel),
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Paper Count',
        data: printers.map(p => p.paperCount),
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      }
    ],
  };

  // DataGrid columns
  const columns = [
    { 
      field: 'tokenNumber', 
      headerName: 'Token', 
      width: 100,
      headerClassName: 'header-theme',
      cellClassName: 'cell-theme'
    },
    { 
      field: 'userName', 
      headerName: 'User Name', 
      width: 200,
      headerClassName: 'header-theme',
      cellClassName: 'cell-theme'
    },
    { 
      field: 'fileName', 
      headerName: 'File Name', 
      width: 200,
      headerClassName: 'header-theme',
      cellClassName: 'cell-theme'
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      headerClassName: 'header-theme',
      cellClassName: 'cell-theme',
      renderCell: (params) => {
        const statusConfig = {
          waiting: { icon: <HourglassEmpty />, color: 'warning.main' },
          printing: { icon: <Print />, color: 'info.main' },
          completed: { icon: <CheckCircle />, color: 'success.main' },
          default: { icon: <Error />, color: 'error.main' }
        };
        
        const { icon, color } = statusConfig[params.value] || statusConfig.default;
        
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', color }}>
            {icon}
            <Typography sx={{ ml: 1 }}>{params.value}</Typography>
          </Box>
        );
      }
    },
    { 
      field: 'assignedPrinter', 
      headerName: 'Printer', 
      width: 120,
      headerClassName: 'header-theme',
      cellClassName: 'cell-theme',
      renderCell: (params) => (
        <Typography>
          {params.value ? `Printer ${params.value}` : '-'}
        </Typography>
      )
    },
    { 
      field: 'timestamp', 
      headerName: 'Time', 
      width: 200,
      headerClassName: 'header-theme',
      cellClassName: 'cell-theme'
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      headerClassName: 'header-theme',
      cellClassName: 'cell-theme',
      renderCell: (params) => (
        <Box>
          {params.row.status === 'waiting' && (
            <>
              <Button 
                variant="contained" 
                size="small"
                onClick={() => updatePrintStatus(params.row.id, 'printing')}
                sx={{ mr: 1 }}
              >
                Auto Assign
              </Button>
              <FormControl size="small" sx={{ minWidth: 120, mr: 1 }}>
                <InputLabel>Select Printer</InputLabel>
                <Select
                  value={selectedPrinter}
                  onChange={(e) => setSelectedPrinter(e.target.value)}
                  label="Select Printer"
                >
                  {printers.map(printer => (
                    <MenuItem 
                      key={printer.id} 
                      value={printer.id}
                      disabled={printer.status !== 'idle' || printer.paperCount < 10 || printer.inkLevel <= 0}
                    >
                      {printer.name} ({printer.status})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => manuallyAssignPrinter(params.row.id)}
                disabled={!selectedPrinter}
              >
                Assign
              </Button>
            </>
          )}
          {params.row.status === 'printing' && (
            <Typography color="info.main">
              Printing on Printer {params.row.assignedPrinter}
            </Typography>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ 
      p: 3,
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      {/* Alert Snackbar */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleAlertClose} 
          severity="info" 
          sx={{ 
            width: '100%',
            boxShadow: 3
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        backgroundColor: 'white',
        p: 2,
        borderRadius: 2,
        boxShadow: 3
      }}>
        <Typography variant="h4" component="h1" sx={{ 
          fontWeight: 'bold',
          color: '#1976d2'
        }}>
          CyberQueue+ Admin Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={generateNewToken}
            sx={{
              fontWeight: 'bold'
            }}
          >
            Generate Token ({newTokenNumber})
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<Refresh />}
            onClick={refreshData}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Current Token Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{
            height: '100%',
            boxShadow: 3,
            borderRadius: 2
          }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Token Management
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mb: 2
              }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Current Token
                  </Typography>
                  <Typography variant="h3" component="div" sx={{
                    fontWeight: 'bold',
                    color: '#1976d2'
                  }}>
                    {settings.currentToken}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Last Token
                  </Typography>
                  <Typography variant="h4" component="div">
                    {settings.lastToken}
                  </Typography>
                </Box>
              </Box>
              <Button 
                variant="contained" 
                fullWidth
                onClick={generateNewToken}
                sx={{
                  mt: 2,
                  fontWeight: 'bold'
                }}
              >
                Generate New Token
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Printers Summary Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{
            height: '100%',
            boxShadow: 3,
            borderRadius: 2
          }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Printers Status
              </Typography>
              <Box sx={{ 
                maxHeight: 250, 
                overflow: 'auto',
                pr: 1
              }}>
                {printers.map(printer => (
                  <Box 
                    key={printer.id} 
                    sx={{ 
                      mb: 2,
                      p: 1,
                      borderRadius: 1,
                      backgroundColor: printer.status === 'printing' ? '#e3f2fd' : 
                                      printer.status === 'maintenance' ? '#ffebee' : '#e8f5e9'
                    }}
                  >
                    <Typography fontWeight="bold">
                      {printer.name}: 
                      <Box 
                        component="span" 
                        sx={{ 
                          ml: 1,
                          color: printer.status === 'printing' ? 'info.main' : 
                                printer.status === 'maintenance' ? 'error.main' : 'success.main'
                        }}
                      >
                        {printer.status.toUpperCase()}
                      </Box>
                    </Typography>
                    <Typography variant="body2">
                      Ink: {printer.inkLevel}%, Paper: {printer.paperCount}
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={printer.inkLevel} 
                      color={printer.inkLevel > 20 ? 'primary' : 'error'}
                      sx={{ height: 5, borderRadius: 5, mb: 1 }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Queue Summary Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{
            height: '100%',
            boxShadow: 3,
            borderRadius: 2
          }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Queue Summary
              </Typography>
              <Typography variant="h3" component="div" sx={{
                fontWeight: 'bold',
                color: '#1976d2',
                mb: 2
              }}>
                {queue.length}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Total print jobs
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                gap: 1,
                mt: 2
              }}>
                <Box sx={{ 
                  textAlign: 'center',
                  p: 1,
                  flex: 1,
                  backgroundColor: '#fff8e1',
                  borderRadius: 1
                }}>
                  <Typography variant="body2" color="text.secondary">
                    Waiting
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#ff8f00' }}>
                    {queue.filter(item => item.status === 'waiting').length}
                  </Typography>
                </Box>
                <Box sx={{ 
                  textAlign: 'center',
                  p: 1,
                  flex: 1,
                  backgroundColor: '#e3f2fd',
                  borderRadius: 1
                }}>
                  <Typography variant="body2" color="text.secondary">
                    Printing
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#1976d2' }}>
                    {queue.filter(item => item.status === 'printing').length}
                  </Typography>
                </Box>
                <Box sx={{ 
                  textAlign: 'center',
                  p: 1,
                  flex: 1,
                  backgroundColor: '#e8f5e9',
                  borderRadius: 1
                }}>
                  <Typography variant="body2" color="text.secondary">
                    Completed
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#2e7d32' }}>
                    {queue.filter(item => item.status === 'completed').length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 2, 
            height: '100%',
            borderRadius: 2,
            boxShadow: 3
          }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Print Job Status Distribution
            </Typography>
            <Box sx={{ 
              height: 300,
              backgroundColor: 'white',
              borderRadius: 1,
              p: 1
            }}>
              <Pie 
                data={statusData} 
                options={{ 
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    }
                  }
                }} 
              />
            </Box>
          </Paper>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 2, 
            height: '100%',
            borderRadius: 2,
            boxShadow: 3
          }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Printer Resources
            </Typography>
            <Box sx={{ 
              height: 300,
              backgroundColor: 'white',
              borderRadius: 1,
              p: 1
            }}>
              <Bar 
                data={printerHealthData} 
                options={{ 
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  },
                  plugins: {
                    legend: {
                      position: 'bottom',
                    }
                  }
                }} 
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Queue Management Table */}
      <Paper sx={{ 
        p: 2,
        mt:6,
        borderRadius: 2,
        boxShadow: 3,
        width: '100%'
      }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Print Queue Management
        </Typography>
        <Box sx={{ 
          height: 400, 
          width: '100%',
          '& .header-theme': {
            backgroundColor: 'rgb(15, 162, 225)',
            color: 'white',
            fontWeight: 'bold'
          },
          '& .cell-theme': {
            borderBottom: '1px solid rgb(255, 255, 255)'
          }
        }}>
          <DataGrid
            rows={queue}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            sx={{
              borderRadius: 2,
              '& .MuiDataGrid-cell:hover': {
                backgroundColor: '#e3f2fd'
              }
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default App;