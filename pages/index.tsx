import Layout from 'components/Layout';
import Head from 'next/head';

import { GetStaticProps } from 'next';
import Card from 'components/Card';
import type { NasaJson } from 'components/Card';
import Section from 'components/Section';
import Container from 'components/Container';
import Row from 'components/Row';
import Heading from 'components/Heading';
import getDate from 'lib/getDate';
import DateRange from 'components/DateRange';
import FlexSide from 'components/FlexSide';
import { useEffect, useState } from 'react';

export default function Index({ nasaJson }: Props) {
  const [apodToday] = nasaJson;
  const [apodPrevious, setApodPrevious] = useState(nasaJson.slice(1));

  const [range, setRange] = useState<DateObject>({ startDate: null, endDate: null });

  const setApod = async () => {
    if (range.startDate && range.endDate) {
      try {
        const nasaData = await fetch(`/api/fetchNasaRange?start_date=${range.startDate.toISOString().split('T')[0]}&end_date=${range.endDate.toISOString().split('T')[0]}`);
        const nasaJsonNew = await nasaData.json();

        if (nasaJsonNew.msg) {
          throw new Error();
        }

        setApodPrevious(nasaJsonNew as NasaJson[]);
      } catch {
        //
      }
    }
  };

  useEffect(() => {
    setApod();
  }, [range]);
  return (
    <Layout>
      <Head>
        <title>
          NASA Astronomy Picture of the day
        </title>
        <meta
          name="description"
          content="View the NASA Astronomy Picture of the day."
        />
      </Head>
      <Section>
        <Card {...apodToday} main />
      </Section>
      <Section>
        <Container>
          <FlexSide>
            <Heading>
              Past Days
            </Heading>
            <DateRange setRange={setRange} />
          </FlexSide>
          {/* todo: add date picker to right of heading */}
          <Row itemWidth={350}>
            {apodPrevious.map((apod) => (
              <Card {...apod} key={apod.date} />
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

  const { startDate, endDate } = getDate(20);

  const nasaData = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}&start_date=${startDate}&end_date=${endDate}`);
  const nasaJson = await nasaData.json();

  return {
    props: {
      nasaJson: nasaJson.reverse(),
    },
    // Refetch at most once per minute
    revalidate: 60,
  };
};

interface Props {
  nasaJson: NasaJson[];
}

interface DateObject {
  startDate: Date | null;
  endDate: Date | null;
}
