import * as React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', size = 'default', ...props }, ref) => {
    const baseClasses = `
      inline-flex items-center justify-center rounded-md text-sm cursor-pointer
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600
      disabled:opacity-50 disabled:pointer-events-none ring-offset-white dark:ring-offset-gray-900
    `;

    const variantClass = `
      bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
    `;

    const sizeClasses = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 px-3',
      lg: 'h-11 px-6',
      icon: 'h-10 w-10 p-0',
    };

    const combinedClasses =
      `${baseClasses} ${variantClass} ${sizeClasses[size]} ${className}`.trim();

    return <button className={combinedClasses} ref={ref} {...props} />;
  },
);

Button.displayName = 'Button';

export { Button };
