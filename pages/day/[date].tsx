import Layout from 'components/Layout';
import Head from 'next/head';

import { GetStaticProps, GetStaticPaths } from 'next';
import Card from 'components/Card';
import Section from 'components/Section';
import getDate from 'lib/getDate';
import type { NasaJson } from 'components/Card';

export default function Index({ nasaJson }: Props) {
  return (
    <Layout>
      <Head>
        <title>
          NASA Astronomy Picture of the day
        </title>
      </Head>
      <Section>
        <Card {...nasaJson} main />
      </Section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const apiKey = process.env.NASA_KEY;

  if (!apiKey) {
    throw new Error('NASA api key missing');
  }

  const nasaData = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}`);
  const nasaJson = await nasaData.json();

  return {
    props: {
      nasaJson,
    },
    // Refetch at most once per minute
    revalidate: 60,
  };
};

interface Props {
  nasaJson: NasaJson;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { startDate, endDate } = getDate(20);

  // Save the 20 latest days at build time
  const nasaData = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}&start_date=${startDate}&end_date=${endDate}`);
  const nasaJson = await nasaData.json();
  const paths = nasaJson.map(({ date }: { date: string }) => ({ params: { date } }));
  return {
    paths,
    fallback: 'blocking',
  };
};
