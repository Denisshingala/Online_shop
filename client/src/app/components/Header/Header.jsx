"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from './Header.module.css';
import { useAuth } from "@/app/utils/authContext";
import axiosInstance from "@/app/utils/axiosInstance";

export default function Header() {
    const pathname = usePathname();
    const { isAuthenticated, destroyToken } = useAuth();
    const navigate = useRouter();

    const logout = async () => {
        await axiosInstance.get("/user/logout")
            .then(() => {
                destroyToken();
                navigate.push("/");
            })
            .catch((error) => {
                console.error(error);
            })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <div className="container-fluid">
                <div className="navbar-brand"><img src="/images/e-commerce.png" alt="" className="img-fluid" width={100} /></div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${styles.navLink} ${pathname == "/" ? styles.active : ""}`} aria-current="page" href="/">Home</Link>
                        </li>
                        {
                            isAuthenticated &&
                            (
                                <>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${styles.navLink} ${pathname == "/add-product" ? styles.active : ""}`} aria-current="page" href="/add-product">Add product</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${styles.navLink} ${pathname == "/my-product" ? styles.active : ""}`} aria-current="page" href="/my-product">My products</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${styles.navLink} ${pathname == "/cart" ? styles.active : ""}`} aria-current="page" href="/cart">Your cart</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${styles.navLink} ${pathname == "/order-history" ? styles.active : ""}`} aria-current="page" href="/order-history">Order history</Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                    <div className="d-flex me-5 pe-5">
                        {isAuthenticated ?
                            <button onClick={logout} className="btn btn-outline-success btn-sm" >Logout</button>
                            :
                            <Link href="/login" className="btn btn-outline-success btn-sm" >Login</Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}
