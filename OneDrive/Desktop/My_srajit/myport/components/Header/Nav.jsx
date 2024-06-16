"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Links=[
  {
    name: "home",
    path: "/"
  },
  {
    name: "about",
    path: "/about"
  },
  {
    name: "experience",
    path: "/experience"
  },
  {
    name: "projects",
    path: "/projects"
  },
  {
    name: "resume",
    path: "/resume"
  }
]

const Nav = () => {
    const pathname=usePathname();
  return (
    <div className="flex gap-8">
      {Links.map((link, index) => {
        return (
          <Link href={link.path} key={index} className={`${link.path===pathname &&
            "text-accent border-b-2 border-accent" 
          } capitalize font-medium hover:text-accent transition-all` }>
            {link.name}
          </Link>
        )
      })}
    </div>
  )
}

export default Nav
