'use client'
import { useState } from "react";
import Sidebar from "../sidebar";
import Header from "../header";

function DashboardLayout({ children }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        // This div is the main container for the layout.
        // The <html>, <head>, and <body> tags were removed to fix the DOM nesting error.
        <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
            <Sidebar isOpen={isSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-y-auto">
                <Header onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;