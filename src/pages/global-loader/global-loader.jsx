import {Loader} from "../../components/loader/loader.jsx";

export const GlobalLoader = () => {
    return (
        <div className={"w-100 vh-100 d-flex align-items-center justify-content-center bg-white"}>
            <Loader />
        </div>
    )
}
