// interface SidebarProps {}

import { Book, LogOut, PieChart, Settings } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="flex w-80 flex-col space-y-5 bg-white px-3">
      <section>
        <ul className="list-none space-y-3">
          <li className="flex w-full cursor-pointer items-center gap-2 rounded-md p-3 font-medium text-primary/70 transition-colors hover:bg-primary/10 aria-selected:bg-primary aria-selected:text-white">
            <Book className="size-4" /> Dashboard
          </li>
          <li className="flex w-full cursor-pointer items-center gap-2 rounded-md p-3 font-medium text-primary/70 transition-colors hover:bg-primary/10 aria-selected:bg-primary aria-selected:text-white">
            <PieChart className="size-4" /> Analytics
          </li>
          <li className="flex w-full cursor-pointer items-center gap-2 rounded-md p-3 font-medium text-primary/70 transition-colors hover:bg-primary/10 aria-selected:bg-primary aria-selected:text-white">
            <Settings className="size-4" /> Configurações
          </li>
          <li className="flex w-full cursor-pointer items-center gap-2 rounded-md p-3 font-medium text-primary/70 transition-colors hover:bg-primary/10 aria-selected:bg-primary aria-selected:text-white">
            <Book className="size-4" /> Forms
          </li>
          <li className="flex w-full cursor-pointer items-center gap-2 rounded-md p-3 font-medium text-primary/70 transition-colors hover:bg-primary/10 aria-selected:bg-primary aria-selected:text-white">
            <LogOut className="size-4" /> Logout
          </li>
        </ul>
      </section>
    </aside>
  )
}
