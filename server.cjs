const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|jpg|jpeg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and image files are allowed.'));
    }
  }
});

app.use(express.json());
app.use(express.static('dist'));

// Certificate verification endpoint
app.post('/api/verify', upload.single('certificate'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock verification result with realistic data
    const mockResults = [
      {
        isValid: true,
        confidence: 95.7,
        institutionName: "Stanford University",
        studentName: "John Doe",
        degree: "Bachelor of Science in Computer Science",
        graduationDate: "June 15, 2023",
        issueDate: "June 20, 2023",
        certificateId: "STU-2023-CS-4521",
        risks: [],
        validationChecks: {
          signatureVerified: true,
          sealAuthentic: true,
          formatValid: true,
          databaseMatch: true,
          tamperingDetected: false
        }
      },
      {
        isValid: false,
        confidence: 23.4,
        institutionName: "Unknown Institution",
        studentName: "Detected Name",
        degree: "Suspicious Certificate",
        graduationDate: "Invalid Date",
        issueDate: "Invalid Date",
        certificateId: "INVALID",
        risks: ["Forged signature detected", "Invalid seal pattern", "Date inconsistencies"],
        validationChecks: {
          signatureVerified: false,
          sealAuthentic: false,
          formatValid: true,
          databaseMatch: false,
          tamperingDetected: true
        }
      },
      {
        isValid: true,
        confidence: 88.2,
        institutionName: "MIT",
        studentName: "Jane Smith",
        degree: "Master of Science in Electrical Engineering",
        graduationDate: "May 20, 2022",
        issueDate: "May 25, 2022",
        certificateId: "MIT-2022-EE-7891",
        risks: ["Minor formatting irregularities"],
        validationChecks: {
          signatureVerified: true,
          sealAuthentic: true,
          formatValid: true,
          databaseMatch: true,
          tamperingDetected: false
        }
      }
    ];

    // Randomly select a result for demonstration
    const result = mockResults[Math.floor(Math.random() * mockResults.length)];

    // Clean up uploaded file after processing
    setTimeout(() => {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }, 5000);

    res.json(result);
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// Bulk verification endpoint
app.post('/api/bulk-verify', upload.array('certificates', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    // Simulate bulk processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    const results = req.files.map((file, index) => ({
      fileName: file.originalname,
      isValid: Math.random() > 0.2, // 80% success rate
      confidence: Math.floor(Math.random() * 40) + 60, // 60-100% confidence
      processed: true
    }));

    // Clean up files
    req.files.forEach(file => {
      fs.unlink(file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    });

    res.json({
      totalProcessed: results.length,
      successful: results.filter(r => r.isValid).length,
      failed: results.filter(r => !r.isValid).length,
      results
    });
  } catch (error) {
    console.error('Bulk verification error:', error);
    res.status(500).json({ error: 'Bulk verification failed' });
  }
});

// Analytics endpoint
app.get('/api/analytics', (req, res) => {
  const mockAnalytics = {
    totalVerifications: 48392,
    fraudDetected: 1305,
    successRate: 97.3,
    averageProcessingTime: 1.2,
    monthlyTrends: [
      { month: 'Jan', verifications: 3420, fraud: 89 },
      { month: 'Feb', verifications: 3890, fraud: 102 },
      { month: 'Mar', verifications: 4123, fraud: 95 },
      { month: 'Apr', verifications: 4567, fraud: 118 },
      { month: 'May', verifications: 4890, fraud: 134 },
      { month: 'Jun', verifications: 5102, fraud: 156 }
    ],
    topInstitutions: [
      { name: 'Stanford University', verifications: 2847, fraudRate: 1.2 },
      { name: 'MIT', verifications: 1998, fraudRate: 0.8 },
      { name: 'Harvard University', verifications: 1756, fraudRate: 1.5 }
    ]
  };

  res.json(mockAnalytics);
});

// Dashboard stats endpoint
app.get('/api/dashboard/stats', (req, res) => {
  const stats = {
    totalVerifications: 12547,
    fraudCases: 342,
    successRate: 97.3,
    activeInstitutions: 89,
    recentActivity: [
      { type: 'verification', institution: 'Stanford University', status: 'verified', time: '2 minutes ago' },
      { type: 'fraud', institution: 'MIT', status: 'flagged', time: '15 minutes ago' },
      { type: 'verification', institution: 'Harvard University', status: 'verified', time: '32 minutes ago' }
    ]
  };

  res.json(stats);
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
  console.log(`🚀 CertGuard API Server running on port ${port}`);
  console.log(`📊 Dashboard: http://localhost:${port}`);
  console.log(`🔍 Verification API: http://localhost:${port}/api/verify`);
});

module.exports = app;