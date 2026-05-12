export function Footer() {
  return (
    <footer className="px-4 py-8 text-center">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Avalon RV. All rights reserved.{' '}
        <a
          href="https://avalonrv.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary hover:underline"
        >
          avalonrv.com
        </a>
      </p>
    </footer>
  )
}
