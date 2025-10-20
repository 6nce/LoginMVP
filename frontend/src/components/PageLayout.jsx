import logo from '../assets/logo.svg';

//Layout for all pages
export default function PageLayout({ children, title }) {
    return (
        <div className="relative flex items-center justify-center min-h-screen bg-[#3B45EA] overflow-hidden">
            <img
                src={logo}
                alt=""
                className="absolute bottom-12 left-12 w-72 opacity-75 pointer-events-none select-none"
            />
            <div className="relative bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-96 max-h-[80vh] overflow-y-auto overflow-x-hidden text-center z-10">
                {title && (
                    <h1 className="text-2xl font-bold mb-4 text-gray-800 drop-shadow-sm">
                        {title}
                    </h1>
                )}
                {children}
            </div>
        </div>
    );
}