import { Route, Routes } from "react-router-dom";
import { Home } from "./routes/Home";
import { TrainerDetails } from "./routes/TrainerDetails";

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/trainerDetails" element={<TrainerDetails />} />

            {/* </Router> */}
        </Routes>
    )
}