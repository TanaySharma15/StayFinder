export function MapView() {
  return (
    <div className="sticky top-32 h-[calc(100vh-8rem)] bg-gray-100 rounded-xl overflow-hidden">
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <p className="text-gray-600">
            Interactive map would be displayed here
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Integration with Google Maps or Mapbox
          </p>
        </div>
      </div>
    </div>
  );
}
