const variants = {
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  error: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
};

const Badge = ({ children, variant = "info", icon: Icon }) => (
  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
    {Icon && <Icon size={12} />}
    {children}
  </span>
);

export default Badge;