export function ContentLayout({ title, children }) {
  return (
    <div>
      <div className="pt-20 pb-8 px-4 sm:px-8">
        {children}
      </div>
    </div>
  );
}