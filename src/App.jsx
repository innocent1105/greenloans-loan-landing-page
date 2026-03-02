import { Routes, Route } from "react-router-dom"
import TextieFinal from "./pages"
import TextieTerms from "./pages/terms_and_conditions"
import TextieContact from "./pages/contact"
import TextiePrivacy from "./pages/privacy"
import TextieSafety from "./pages/safety"
import TextieSuccess from "./pages/success_stories"
import TextieGuidelines from "./pages/guidelines"
import LoanServices from "./pages/services"
import Locations from "./pages/locations"

function App() {
  return (
    <Routes>
      <Route path="/" element={<TextieFinal />} />
      <Route path="/about" element={<TextieFinal />} />
      <Route path="/terms" element={<TextieTerms />} />
      <Route path="/contact" element={<TextieContact />} />
      <Route path="/privacy" element={<TextiePrivacy />} />
      <Route path="/safety" element={<TextieSafety />} />
      <Route path="/success_stories" element={<TextieSuccess />} />
      <Route path="/guidelines" element={<TextieGuidelines />} />
      <Route path="/services" element={<LoanServices />} />
      <Route path="/locations" element={<Locations />} />
    </Routes>
  )
}

export default App
