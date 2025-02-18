import Link from "next/link";

function ApplicationLogo() {
  return (
    <Link href={"/"} className="font-bold text-blue-500 text-2xl">
      EXCEL <span className="text-gray-700">UPLOAD</span>
    </Link>
  );
}

export default ApplicationLogo;
