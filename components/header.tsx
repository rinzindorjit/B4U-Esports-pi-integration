"use client"

import { useState, useEffect } from "react"

export function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    const overlay = document.getElementById("overlay")
    if (overlay) {
      overlay.classList.toggle("active")
    }
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
    const overlay = document.getElementById("overlay")
    if (overlay) {
      overlay.classList.remove("active")
    }
  }

  useEffect(() => {
    const overlay = document.getElementById("overlay")
    if (overlay) {
      overlay.addEventListener("click", closeSidebar)
    }

    return () => {
      if (overlay) {
        overlay.removeEventListener("click", closeSidebar)
      }
    }
  }, [])

  return (
    <>
      <header className="fixed top-0 w-full bg-[rgba(59,28,99,0.9)] backdrop-blur-[10px] z-[1000] shadow-[0_2px_10px_rgba(0,0,0,0.3)] p-4">
        <div className="flex justify-between items-center max-w-[1200px] mx-auto">
          <img
            src="https://b4uesports.com/wp-content/uploads/2025/04/cropped-Black_and_Blue_Simple_Creative_Illustrative_Dragons_E-Sport_Logo_20240720_103229_0000-removebg-preview.png"
            alt="B4U Esports Logo"
            className="h-[50px]"
          />

          <button
            className="bg-none border-none text-white text-[1.8rem] cursor-pointer p-[5px] z-[1001] block lg:hidden"
            onClick={() => {
              console.log("[v0] Hamburger clicked, current state:", isSidebarOpen)
              toggleSidebar()
            }}
          >
            <i className={isSidebarOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>
        </div>
      </header>

      <nav
        className={`fixed top-0 w-[280px] h-full bg-[rgba(59,28,99,0.95)] transition-all duration-300 ease-in-out p-5 z-[999] overflow-y-auto backdrop-blur-[10px] ${
          isSidebarOpen ? "left-0 shadow-[5px_0_15px_rgba(0,0,0,0.3)]" : "left-[-100%]"
        }`}
        style={{ display: isSidebarOpen ? "block" : "block" }} // Always rendered for smooth transitions
      >
        <ul className="list-none mt-20">
          <li className="my-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                console.log("[v0] Home clicked")
                window.scrollTo({ top: 0, behavior: "smooth" })
                closeSidebar()
              }}
              className="text-white no-underline text-[1.1rem] flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-[rgba(255,255,255,0.2)]"
            >
              <i className="fas fa-home mr-3 w-5 text-center"></i>Home
            </a>
          </li>
          <li className="my-6">
            <a
              href="https://b4uesports.com/my-account/"
              className="text-white no-underline text-[1.1rem] flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-[rgba(255,255,255,0.2)]"
            >
              <i className="fas fa-user mr-3 w-5 text-center"></i>My Account
            </a>
          </li>
          <li className="my-6">
            <a
              href="https://b4uesports.com/shop/"
              className="text-white no-underline text-[1.1rem] flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-[rgba(255,255,255,0.2)]"
            >
              <i className="fas fa-store mr-3 w-5 text-center"></i>Shop
            </a>
          </li>
          <li className="my-6">
            <a
              href="https://b4uesports.com/blogs/"
              className="text-white no-underline text-[1.1rem] flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-[rgba(255,255,255,0.2)]"
            >
              <i className="fas fa-blog mr-3 w-5 text-center"></i>Blogs
            </a>
          </li>
          <li className="my-6">
            <a
              href="#tournaments"
              onClick={(e) => {
                e.preventDefault()
                console.log("[v0] Tournaments clicked")
                document.getElementById("tournaments")?.scrollIntoView({ behavior: "smooth" })
                closeSidebar()
              }}
              className="text-white no-underline text-[1.1rem] flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-[rgba(255,255,255,0.2)]"
            >
              <i className="fas fa-trophy mr-3 w-5 text-center"></i>Tournaments
            </a>
          </li>
          <li className="my-6">
            <a
              href="https://b4uesports.com/purchase-in-game-tokens-and-social-media-boosting-services-with-pi/"
              className="text-white no-underline text-[1.1rem] flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-[rgba(255,255,255,0.2)]"
            >
              <i className="fas fa-coins mr-3 w-5 text-center"></i>Buy with PI
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}
