import type { NextPage } from "next";
import Layout from "../layout";

const About: NextPage = () => {
  return (
    <Layout>
      <div className="max-w-lg font-light">
        <p>
          Spotify Dashboard provides an overview of your listening habits. You
          can view your favorite tracks and artists from different time periods.
          The project is completely open source and you can view the code on{" "}
          <a
            className="font-sans underline"
            href="https://github.com/MaximilianHagelstam/spotify-dashboard/"
          >
            GitHub.
          </a>
        </p>

        <p className="mt-4">
          This dashboard has no analytics and collects no personal data. The
          token authorized is stored in cookies. We request access to your top
          artists and tracks. You can read more about Spotify&apos;s API{" "}
          <a
            className="font-sans underline"
            href="https://github.com/MaximilianHagelstam/spotify-dashboard/"
          >
            here.
          </a>
        </p>

        <p className="mt-4 mb-8">
          Have fun listening{" "}
          <span role="img" aria-label="peace sign">
            ✌️
          </span>
        </p>
      </div>
    </Layout>
  );
};

export default About;
