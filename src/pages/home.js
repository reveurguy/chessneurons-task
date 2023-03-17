import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="bg-gray-50 antialiased">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Welcome to
            <strong className="font-extrabold text-red-700 sm:block">
              ChessNeurons Task!
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl leading-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptas, quod, voluptates, quae quia voluptate quibusdam.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/login"
              className="block w-full rounded bg-red-600 px-12 py-3 text-lg font-bold text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="/get-started">
              Login
            </Link>

            <Link to="/register"
              className="block w-full rounded px-12 py-3 bg-black hover:bg-black/70 text-lg font-bold text-white shadow focus:outline-none focus:ring sm:w-auto"
              href="/about">
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
