import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { StylistContext } from "../StylistContext";

export default function AccountPage() {
    const [redirect,setRedirect] = useState(null);
    const {ready,stylist,setStylist} = useContext(StylistContext);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'stylistprofile';
    }

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setStylist(null);
    }

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !stylist && !redirect) {
        return <Navigate to={'/login'} />
    }


    console.log(subpage);

    function linkClasses (type=null) {
        let classes = 'p-2 px-6';
        if (type ===subpage) {
            classes += 'primary text-blue-500 rounded-full';
        }
        return classes;
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2">
            <Link className={linkClasses('profile')} to={'/stylistaccount'}>My Profile</Link>
            <Link className={linkClasses('bookings')} to={'/stylistaccount/bookings'}>My Bookings</Link>
            <Link className={linkClasses('portfolio')} to={'/stylistaccount/portfolio'}>My Portfolio</Link>
            </nav>
            {subpage ==='stylistprofile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {stylist.name} ({stylist.email})<br />
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
        </div>
    );
}