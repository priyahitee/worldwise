import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {Pricing, Product, HomePage, NotFoundPage, Login, AppLayout, ProtectedRoute} from './pages'
import {City, CityList, CountryList, Form} from './components'
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

  function App() {
    return (
      <AuthProvider >
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='product' element={<Product />} />
            <Route path='pricing' element={<Pricing />} />
            <Route path='login' element={<Login />} />
            <Route path='app' element={
              <ProtectedRoute><AppLayout /></ProtectedRoute>
              } >
              <Route index element={<Navigate replace to='cities'/>} />
              <Route path="cities" element={<CityList/>} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form/>} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
      </AuthProvider>
    );
  }

export default App;
