import {defaultCategories} from "@/data/categories";
import Link from "next/link";
import {ROUTES} from "@/constants/routes";

export default function CategoriesSection()
{
    return(
        <section className="bg-gray-50 py-16">
            <div className="mx-auto max-w-6xl px-4">
                <div className ="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
                    <p className ="mt-2 text-gray-500">Find Exactly what you are looking for</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {defaultCategories.map((cat)=>(
                    <Link
                       key={cat.id}
                       href={ROUTES.LOGIN}
                       className="group flex flex-col items-center rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                       >
                        <div className="mb-3 h-16 w-16 overflow-hidden rounded-full">
                            <img src={cat.image} alt={cat.name} className="h-full w-full object-cover"/>
                        </div>
                        <span className="text-center text-sm font-semibold text-gray-800 group-hover:text-blue-600">
                            {cat.name}
                        </span>
                       </Link>
                ))}
            </div>
        </section>
    )
}