import { Contact } from "@/lib/constants";
import { Facebook, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-surface-dark border-t border-white/10  flex items-center justify-center"
            style={{
                height: "3rem"
            }}
        >
            <div className="container mx-auto px-4 text-center flex items-center justify-between">
                <p className="text-text-muted text-sm">
                    © {new Date().getFullYear()} Future Solutions Dev. All rights reserved.
                </p>
                {/* contacts */}
                <div className="flex items-center gap-3">
                    {/* Email */}
                    <div className="relative group">
                        <Link
                            href={`mailto:${Contact.Email}`}
                            target="_blank"
                            className="text-gray-500 hover:text-gray-700 transition-all"
                        >
                            <Mail size={20} />
                        </Link>
                        <span className="absolute -top-9 left-1/2 -translate-x-1/2 
            whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs text-white
            opacity-0 group-hover:opacity-100 transition-opacity">
                            Email
                            <span className="absolute left-1/2 top-full -translate-x-1/2 
        border-4 border-transparent border-t-black" />
                        </span>
                    </div>

                    {/* Phone */}
                    <div className="relative group">
                        <Link
                            href={`tel:${Contact.Phone}`}
                            target="_blank"
                            className="text-green-600 hover:text-green-700 transition-all"
                        >
                            <Phone size={20} />
                        </Link>
                        <span className="absolute -top-9 left-1/2 -translate-x-1/2 
            whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs text-white
            opacity-0 group-hover:opacity-100 transition-opacity">
                            Phone
                        </span>
                    </div>

                    {/* Facebook */}
                    <div className="relative group">
                        <Link
                            href={Contact.Facebook}
                            target="_blank"
                            className="text-[#1877F2] hover:text-[#145DBF] transition-all"
                        >
                            <Facebook size={20} />
                        </Link>
                        <span className="absolute -top-9 left-1/2 -translate-x-1/2 
            whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs text-white
            opacity-0 group-hover:opacity-100 transition-opacity">
                            Facebook
                            <span className="absolute left-1/2 top-full -translate-x-1/2 
        border-4 border-transparent border-t-black" />
                        </span>
                    </div>

                    {/* LinkedIn */}
                    <div className="relative group">
                        <Link
                            href={Contact.LinkedIn}
                            target="_blank"
                            className="text-[#0A66C2] hover:text-[#084E96] transition-all"
                        >
                            <Linkedin size={20} />
                        </Link>
                        <span className="absolute -top-9 left-1/2 -translate-x-1/2 
            whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs text-white
            opacity-0 group-hover:opacity-100 transition-opacity">
                            LinkedIn
                            <span className="absolute left-1/2 top-full -translate-x-1/2 
        border-4 border-transparent border-t-black" />
                        </span>
                    </div>

                    {/* WhatsApp */}
                    <div className="relative group">
                        <Link
                            href={Contact.WhatsApp}
                            target="_blank"
                            className="text-[#25D366] hover:text-[#1EBE5D] transition-all"
                        >
                            <MessageCircle size={20} />
                        </Link>
                        <span className="absolute -top-9 left-1/2 -translate-x-1/2 
            whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs text-white
            opacity-0 group-hover:opacity-100 transition-opacity">
                            WhatsApp
                            <span className="absolute left-1/2 top-full -translate-x-1/2 
        border-4 border-transparent border-t-black" />
                        </span>
                    </div>
                </div>


            </div>
        </footer>
    );
}
