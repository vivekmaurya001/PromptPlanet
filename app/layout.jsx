import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "promptplanet",
  description: "find best ai prompts out there",
};

const layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app ">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default layout;
