// import React from 'react';
// import { useState } from "react";
// import { usePrint } from "../context/PrintContext";
// import { useNavigate } from 'react-router-dom';

// export function FormUpload() {
//   const [file, setFile] = useState(null);
//   const [copies, setCopies] = useState(1);
//   const [isDuplex, setIsDuplex] = useState(false);
//   const [isColor, setIsColor] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [token, setToken] = useState(null);
//   const { submitPrintJob } = usePrint();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) return;
    
//     setIsSubmitting(true);
//     try {
//       const tokenNumber = await submitPrintJob(file, copies, {
//         duplex: isDuplex,
//         color: isColor,
//       });
//       setToken(tokenNumber);
//     } catch (error) {
//       console.error("Error submitting print job:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="print-form">
//       <h2>Submit Print Job</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Select File (PDF, DOC, DOCX)</label>
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx"
//             onChange={(e) => setFile(e.target.files[0])}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Number of Copies</label>
//           <input
//             type="number"
//             min="1"
//             max="10"
//             value={copies}
//             onChange={(e) => setCopies(parseInt(e.target.value))}
//           />
//         </div>
//         <div className="form-group checkbox">
//           <label>
//             <input
//               type="checkbox"
//               checked={isDuplex}
//               onChange={(e) => setIsDuplex(e.target.checked)}
//             />
//             Double-sided Printing
//           </label>
//         </div>
//         <div className="form-group checkbox">
//           <label>
//             <input
//               type="checkbox"
//               checked={isColor}
//               onChange={(e) => setIsColor(e.target.checked)}
//             />
//             Color Printing
//           </label>
//         </div>
//         <button type="submit" disabled={isSubmitting || !file}>
//           {isSubmitting ? "Submitting..." : "Submit Print Job"}
//         </button>
//       </form>
//       {token && (
//         <div className="success-message">
//           <p>Print job submitted successfully!</p>
//           <p>Your token number: <strong>{token}</strong></p>
//           <p>You can track your job status below.</p>


//           <button 
//             onClick={() => navigate('/jobs')}
//             style={{
//               marginTop: '15px',
//               padding: '8px 16px',
//               backgroundColor: '#4CAF50',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer'
//             }}
//           >
//             View My Print Jobs
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }



import React from 'react';
import { useState } from "react";
import { usePrint } from "../context/PrintContext";
import { useNavigate } from 'react-router-dom';

export function FormUpload() {
  const [file, setFile] = useState(null);
  const [copies, setCopies] = useState(1);
  const [isDuplex, setIsDuplex] = useState(false);
  const [isColor, setIsColor] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState(null);
  const { submitPrintJob } = usePrint();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    
    setIsSubmitting(true);
    try {
      const tokenNumber = await submitPrintJob(file, copies, {
        duplex: isDuplex,
        color: isColor,
      });
      setToken(tokenNumber);
    } catch (error) {
      console.error("Error submitting print job:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      background: 'linear-gradient(145deg, #f6f9fc, #ffffff)',
      border: '1px solid rgba(255,255,255,0.3)'
    }}>
      <h2 style={{
        color: '#4a4e69',
        textAlign: 'center',
        marginBottom: '1.5rem',
        fontSize: '1.8rem',
        fontWeight: '600',
        background: 'linear-gradient(90deg, #ff758c, #ff7eb3)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>Submit Print Job</h2>
      
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem'
      }}>
        {/* File Input */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <label style={{
            fontSize: '1rem',
            fontWeight: '500',
            color: '#4a4e69',
            marginLeft: '0.2rem'
          }}>Select File (PDF, DOC, DOCX)</label>
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            display: 'inline-block',
            width: '100%'
          }}>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
              required
              style={{
                position: 'absolute',
                left: '0',
                top: '0',
                opacity: '0',
                width: '100%',
                height: '100%',
                cursor: 'pointer'
              }}
            />
            <div style={{
              padding: '0.8rem 1rem',
              backgroundColor: '#f0f4f8',
              borderRadius: '8px',
              border: '2px dashed #9a8c98',
              color: '#4a4e69',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              ':hover': {
                backgroundColor: '#e2e8f0',
                borderColor: '#ff758c'
              }
            }}>
              {file ? file.name : 'Choose a file'}
            </div>
          </div>
        </div>
        
        {/* Copies Input */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <label style={{
            fontSize: '1rem',
            fontWeight: '500',
            color: '#4a4e69',
            marginLeft: '0.2rem'
          }}>Number of Copies (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={copies}
            onChange={(e) => setCopies(parseInt(e.target.value))}
            style={{
              padding: '0.8rem 1rem',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
              color: '#4a4e69',
              backgroundColor: '#f8fafc',
              transition: 'all 0.3s ease',
              ':hover': {
                borderColor: '#9a8c98'
              },
              ':focus': {
                outline: 'none',
                borderColor: '#ff758c',
                boxShadow: '0 0 0 2px rgba(255,117,140,0.2)'
              }
            }}
          />
        </div>
        
        {/* Checkboxes */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginTop: '0.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem'
          }}>
            <div style={{
              position: 'relative',
              width: '20px',
              height: '20px'
            }}>
              <input
                type="checkbox"
                checked={isDuplex}
                onChange={(e) => setIsDuplex(e.target.checked)}
                style={{
                  position: 'absolute',
                  opacity: '0',
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  zIndex: '1'
                }}
              />
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                border: '2px solid #9a8c98',
                backgroundColor: isDuplex ? '#ff758c' : 'transparent',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {isDuplex && (
                  <span style={{
                    color: 'white',
                    fontSize: '14px'
                  }}>✓</span>
                )}
              </div>
            </div>
            <label style={{
              fontSize: '1rem',
              color: '#4a4e69',
              cursor: 'pointer',
              transition: 'color 0.2s ease',
              ':hover': {
                color: '#ff758c'
              }
            }}>Double-sided Printing</label>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem'
          }}>
            <div style={{
              position: 'relative',
              width: '20px',
              height: '20px'
            }}>
              <input
                type="checkbox"
                checked={isColor}
                onChange={(e) => setIsColor(e.target.checked)}
                style={{
                  position: 'absolute',
                  opacity: '0',
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  zIndex: '1'
                }}
              />
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                border: '2px solid #9a8c98',
                backgroundColor: isColor ? '#ff758c' : 'transparent',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {isColor && (
                  <span style={{
                    color: 'white',
                    fontSize: '14px'
                  }}>✓</span>
                )}
              </div>
            </div>
            <label style={{
              fontSize: '1rem',
              color: '#4a4e69',
              cursor: 'pointer',
              transition: 'color 0.2s ease',
              ':hover': {
                color: '#ff758c'
              }
            }}>Color Printing</label>
          </div>
        </div>
        
        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isSubmitting || !file}
          style={{
            padding: '0.8rem',
            backgroundColor: isSubmitting || !file ? '#cccccc' : '#ff758c',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isSubmitting || !file ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            marginTop: '1rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px rgba(255, 117, 140, 0.2)',
            ':hover': !isSubmitting && file ? {
              backgroundColor: '#ff7eb3',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 12px rgba(255, 117, 140, 0.3)'
            } : {}
          }}
        >
          {isSubmitting ? (
            <>
              <span style={{
                display: 'inline-block',
                width: '1rem',
                height: '1rem',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: 'white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginRight: '0.5rem',
                verticalAlign: 'middle'
              }}></span>
              Processing...
            </>
          ) : 'Submit Print Job'}
        </button>
      </form>
      
      {/* Success Message */}
      {token && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1.2rem',
          backgroundColor: '#e8f5e9',
          borderRadius: '8px',
          borderLeft: '4px solid #4caf50',
          animation: 'fadeIn 0.5s ease-out',
          boxShadow: '0 4px 6px rgba(76, 175, 80, 0.1)'
        }}>
          <p style={{
            color: '#2e7d32',
            marginBottom: '0.5rem',
            fontWeight: '500',
            fontSize: '1.1rem'
          }}>Print job submitted successfully!</p>
          <p style={{
            color: '#2e7d32',
            marginBottom: '0.5rem',
            fontSize: '0.95rem'
          }}>Your token number: <strong style={{
            fontSize: '1.1rem',
            color: '#1b5e20'
          }}>{token}</strong></p>
          <p style={{
            color: '#2e7d32',
            marginBottom: '1rem',
            fontSize: '0.95rem'
          }}>You can track your job status below.</p>
          
          <button 
            onClick={() => navigate('/jobs')}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(76, 175, 80, 0.2)',
              ':hover': {
                backgroundColor: '#43a047',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 8px rgba(76, 175, 80, 0.3)'
              }
            }}
          >
            View My Print Jobs
          </button>
        </div>
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}