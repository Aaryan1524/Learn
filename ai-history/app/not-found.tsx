import Link from "next/link";
export default function NotFound() { return <><h1 className="title">Not found <span>· 404</span></h1><p className="statement">This page has moved, or isn’t written yet.</p><div className="actions"><Link className="btn" href="/">Go home</Link><Link className="text-btn" href="/eras/foundations">Part 1</Link></div></>; }
