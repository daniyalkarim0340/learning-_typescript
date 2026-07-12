import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used strictly within an AuthProvider wrapper");
    }
    return context;
};
//# sourceMappingURL=useAuth.js.map