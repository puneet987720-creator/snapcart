export function NotFound404() {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md">

        {/* 404 number */}
        <h1 className="text-9xl font-black text-base-content tracking-tight">
          404
        </h1>

        {/* Divider */}
        <div className="divider" />

        {/* Message */}
        <h2 className="text-xl font-semibold text-base-content mb-2">
          Page Not Found
        </h2>
        <p className="text-base-content/50 text-sm mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          {/* Solid black button with white text */}
          <a href="/" className="btn bg-black text-white hover:bg-gray-800">
            Go Home
          </a>

          {/* White button with black border/text */}
          <button
            className="btn border border-black text-black bg-white hover:bg-gray-100"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
}
