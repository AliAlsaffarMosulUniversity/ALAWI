// إعدادات الربط بـ Firebase.
// اتركها null لتعمل الصفحة بالحفظ المحلي في المتصفح فقط (كما في النسخة التجريبية).
// للتفعيل: الصق كائن الإعدادات من Firebase Console → Project settings → Your apps → Web app → SDK setup and configuration → Config
// مثال:
// window.FIREBASE_CONFIG = {
//   apiKey: "...",
//   authDomain: "....firebaseapp.com",
//   projectId: "...",
//   storageBucket: "....appspot.com",
//   messagingSenderId: "...",
//   appId: "..."
// };
// هذه القيم ليست سرية؛ الحماية تأتي من قواعد firestore.rules.
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyBKJMTbOB6QfPg3j1uTocR2LUX_zTeL7_8",
  authDomain: "alawi-department.firebaseapp.com",
  projectId: "alawi-department",
  storageBucket: "alawi-department.firebasestorage.app",
  messagingSenderId: "232978395414",
  appId: "1:232978395414:web:42ea214adcaadac31de037"
};

// النطاق المسموح بتسجيل الدخول منه (يجب أن يطابق firestore.rules)
window.ALLOWED_DOMAIN = 'uomosul.edu.iq';
