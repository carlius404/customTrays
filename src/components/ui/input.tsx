import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, placeholder, label, id, ...props }, ref) => {
		const isInvalid = props["aria-invalid"];
		return (
			<div className="relative">
				<input
					type={type}
					id={id}
					className={cn(
						"block peer h-10 z-10 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
						className,
						`${
							isInvalid
								? "border-destructive"
								: "border-input hover:border-primary/50 focus:border-primary/50"
						}`
					)}
					ref={ref}
					placeholder=" "
					{...props}
				/>
				<label
					htmlFor={id}
					className={`absolute text-sm bg-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-3 peer-focus:px-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[0.3rem] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 pointer-events-none
					${isInvalid ? "text-destructive" : "text-primary/50"}`}
				>
					{label}
				</label>
			</div>
		);
	}
);
Input.displayName = "Input";

export { Input };
