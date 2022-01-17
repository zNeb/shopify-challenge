import Layout from 'components/Layout';
import Head from 'next/head';

import { GetStaticProps, GetStaticPaths } from 'next';
import Section from 'components/Section';
import getDate from 'lib/getDate';
import type { NasaJson } from 'components/Card';
import Showcase from 'components/Showcase';
import Container from 'components/Container';
import Header from 'components/Header';
import Heading from 'components/Heading';
import Bold from 'components/Bold';

export default function Index({ nasaJson }: Props) {
  return (
    <Layout>
      <Head>
        <title>
          NASA Astronomy Picture of the day
        </title>
      </Head>
      <Section>
        <Showcase {...nasaJson} />
      </Section>
      <Section>
        <Container>
          <Heading>
            {nasaJson.title}
          </Heading>
          {nasaJson.explanation}
          <Bold>
            Date:
            {' '}
            {nasaJson.date}
          </Bold>
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apiKey = process.env.NASA_KEY;

  if (!apiKey) {
    throw new Error('NASA api key missing');
  }

  if (!params?.date) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  const nasaData = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}&date=${params.date}`);
  const nasaJson = await nasaData.json();

  if (nasaJson.msg) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

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
