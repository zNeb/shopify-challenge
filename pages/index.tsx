import Layout from 'components/Layout';
import Head from 'next/head';

import { GetStaticProps } from 'next';
import Card from 'components/Card';
import Section from 'components/Section';
import Container from 'components/Container';
import Row from 'components/Row';

export default function Index({ nasaJson }: Props) {
  return (
    <Layout>
      <Head>
        <title>
          NASA Astronomy Picture of the day
        </title>
      </Head>
      <Section>
        <Container>
          <Row itemWidth={350}>
            {nasaJson.slice(1).map((apod) => (
              <Card {...apod} key={apod.title} />
            ))}
          </Row>
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const apiKey = process.env.NASA_KEY;

  if (!apiKey) {
    throw new Error('NASA api key missing');
  }

  // Gets today's date and the day 20 days ago into a YYYY-MM-DD string
  const date = new Date();
  const endDate = date.toISOString().split('T')[0];
  date.setDate(date.getDate() - 20);
  const startDate = date.toISOString().split('T')[0];

  const nasaData = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}&start_date=${startDate}&end_date=${endDate}`);
  const nasaJson = await nasaData.json();

  return {
    props: {
      // Only send required data
      nasaJson: nasaJson.reverse(),
    },
    // Refetch at most once per minute
    revalidate: 60,
  };
};

interface Props {
  nasaJson: NasaJson[];
}

interface NasaJson {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: 'v1';
  title: string;
  url: string;
}
