import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/User";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import Register from "./pages/Auth/Register";
import WithoutFrame from "./components/global/WithoutFrame";
import WithFrame from "./components/global/WithFrame";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import NewPassword from "./pages/Auth/NewPassword";
import PAD from "./pages/PAD";
import Kemasan from "./pages/Kemasan";
import Keranjang from "./pages/Keranjang";
import PesanSekarang from "./pages/PesanSekarang";
import ScrollToTop from "./services/ScrollToTop";
import LoginAdmin from "./pages/Admin/auth/LoginAdmin";
import RegisterAdmin from "./pages/Admin/auth/RegisterAdmin";
import ForgotPasswordAdmin from "./pages/Admin/auth/ForgotPasswordAdmin";
import NewPasswordAdmin from "./pages/Admin/auth/NewPasswordAdmin";
import ActivateAccountAdmin from "./pages/Admin/auth/ActivateAccountAdmin";
import ActivateAccountSuccessAdmin from "./pages/Admin/auth/ActivateAccountSuccessAdmin";
import Admin from "./pages/Admin";
import AdminCS from "./pages/Admin/AdminCS";
import AdminDesain from "./pages/Admin/AdminDesain";
import AdminTU from "./pages/Admin/AdminTU";
import AdminSuper from "./pages/Admin/AdminSuper";
import AdminProduksi from "./pages/Admin/AdminProduksi";
import AdminKasir from "./pages/Admin/AdminKasir";
import AdminGudang from "./pages/Admin/AdminGudang";
import ActivateAccount from "./pages/Auth/ActivateAccount";

const ProtectingRoute = (props) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  useEffect(() => {
    if (!user) navigate("/");
  }, [navigate, user]);

  return props.children;
};

const AuthenticatedRoute = (props) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    !user ? navigate("/login") : navigate("/");
  }, [navigate, user]);

  return props.children;
};

const AuthenticatedAdminRoute = (props) => {
  const navigate = useNavigate();
  const admin = localStorage.getItem("admin");

  useEffect(() => {
    !admin ? navigate("/admin/login") : navigate("/admin");
  }, [navigate, admin]);

  return props.children;
};

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route element={<WithoutFrame />}>
          {/* User Authentication */}
          <Route
            path="/login/"
            element={
              <AuthenticatedRoute>
                <Login />
              </AuthenticatedRoute>
            }
          />

          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/new-password/:resetToken" element={<NewPassword />} />
          <Route
            path="/activate-account/:activateToken"
            element={<ActivateAccount />}
          />
          {/* End of User Authentication */}
          {/* Dashboard User */}
          <Route
            path="/dashboard/pesanan"
            element={
              <ProtectingRoute>
                <Dashboard />
              </ProtectingRoute>
            }
          />
          <Route
            path="/dashboard/detail/:pesananId"
            element={
              <ProtectingRoute>
                <Dashboard />
              </ProtectingRoute>
            }
          />
          <Route
            path="/dashboard/pembayaran"
            element={
              <ProtectingRoute>
                <Dashboard />
              </ProtectingRoute>
            }
          />
          <Route
            path="/dashboard/lacak-pesanan"
            element={
              <ProtectingRoute>
                <Dashboard />
              </ProtectingRoute>
            }
          />
          <Route
            path="/dashboard/profil"
            element={
              <ProtectingRoute>
                <Dashboard />
              </ProtectingRoute>
            }
          />
          {/* End of Dashboard User */}
          {/* Admin Authentication */}
          <Route
            path="/admin/login"
            element={
              <AuthenticatedAdminRoute>
                <LoginAdmin />
              </AuthenticatedAdminRoute>
            }
          />
          <Route path="/admin/register" element={<RegisterAdmin />} />
          <Route
            path="/admin/forgot-password"
            element={<ForgotPasswordAdmin />}
          />
          <Route path="/admin/new-password" element={<NewPasswordAdmin />} />
          <Route
            path="/admin/activate-account"
            element={<ActivateAccountAdmin />}
          />
          <Route
            path="/admin/activate-account-success"
            element={<ActivateAccountSuccessAdmin />}
          />
          {/* End of Admin Authentication */}
          {/* Dashboard Admin */}
          <Route path="/admin" element={<Admin />} />
          {/* Dashboard Admin CS */}
          <Route path="/admin/cs/dashboard" element={<AdminCS />} />
          <Route
            path="/admin/cs/dashboard/retribusi-pelanggan"
            element={<AdminCS />}
          />
          <Route
            path="/admin/cs/dashboard/detail-retribusi-pelanggan/:retribusiId"
            element={<AdminCS />}
          />
          <Route path="/admin/cs/dashboard/status-po" element={<AdminCS />} />
          <Route
            path="/admin/cs/dashboard/rekap-pesanan"
            element={<AdminCS />}
          />
          <Route path="/admin/cs/dashboard/pad" element={<AdminCS />} />
          <Route path="/admin/cs/dashboard/profil" element={<AdminCS />} />
          {/* End of AdminCS */}

          {/* Dashboard Admin Desain */}
          <Route path="/admin/desain/dashboard" element={<AdminDesain />} />
          <Route
            path="/admin/desain/dashboard/riwayat-chat"
            element={<AdminDesain />}
          />
          <Route
            path="/admin/desain/dashboard/konfirmasi-desain"
            element={<AdminDesain />}
          />
          <Route
            path="/admin/desain/dashboard/profil"
            element={<AdminDesain />}
          />
          {/* End of Admin Desain */}
          {/* Dashboard Admin Gudang */}
          <Route path="/admin/gudang/dashboard" element={<AdminGudang />} />
          <Route
            path="/admin/gudang/dashboard/profil"
            element={<AdminGudang />}
          />
          {/* End of Admin Gudang */}
          {/* Dashboard Admin Kasir */}
          <Route path="/admin/kasir/dashboard" element={<AdminKasir />} />
          <Route
            path="/admin/kasir/dashboard/pembayaran"
            element={<AdminKasir />}
          />
          <Route path="/admin/kasir/dashboard/pad" element={<AdminKasir />} />
          <Route
            path="/admin/kasir/dashboard/profil"
            element={<AdminKasir />}
          />
          {/* End of Admin Kasir */}
          {/* Dashboard Admin Produksi */}
          <Route path="/admin/produksi/dashboard" element={<AdminProduksi />} />
          <Route
            path="/admin/produksi/dashboard/profil"
            element={<AdminProduksi />}
          />
          {/* End of Admin Produksi */}
          {/* Dashboard Admin Super */}
          <Route path="/admin/super/dashboard" element={<AdminSuper />} />
          <Route
            path="/admin/super/dashboard/anggota"
            element={<AdminSuper />}
          />
          <Route
            path="/admin/super/dashboard/produk"
            element={<AdminSuper />}
          />
          <Route
            path="/admin/super/dashboard/spesifikasi"
            element={<AdminSuper />}
          />
          <Route
            path="/admin/super/dashboard/rekap-pesanan"
            element={<AdminSuper />}
          />
          <Route
            path="/admin/super/dashboard/profil"
            element={<AdminSuper />}
          />
          {/* End of Admin Super */}
          {/* Dashboard Admin TU */}
          <Route path="/admin/tu/dashboard" element={<AdminTU />} />
          <Route path="/admin/tu/dashboard/profil" element={<AdminTU />} />
          {/* End of Admin TU */}
          {/* End of Admin Dashboard */}
          <Route path="*" element="404 Not Found" />
        </Route>
        <Route element={<WithFrame />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail-produk/:productId" element={<DetailProduct />} />
          <Route path="/laporan" element={<PAD />} />
          <Route path="/produk-kemasan" element={<Kemasan />} />
          <Route path="/keranjang" element={<Keranjang />} />
          <Route path="/pesan-sekarang" element={<PesanSekarang />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
