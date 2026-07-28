import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function AdminProject() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn("space-y-6 px-16 py-6")}
        >
            <h1>INVOICE</h1>
        </motion.div>
    )
}
