import { Outlet } from "react-router-dom";


const Root = () => {
    return (
        <div>
            <h1 className="text-3xl">fitness tracker</h1>
            <Outlet></Outlet>
            
        </div>
    );
};

export default Root;