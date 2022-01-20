/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import Bold from './index';
import styles from './Bold.module.css';

describe('Bold', () => {
  it('Renders an empty span', () => {
    const { container } = render(<Bold>{}</Bold>);

    const span = container.getElementsByClassName(styles.bold);
    expect(span.length).toBe(1);
  });

  it('Renders a span with correct text', () => {
    const { container, queryByText } = render(<Bold>Bold Text</Bold>);

    const heading = container.getElementsByClassName(styles.bold);

    const headingChildren = heading[0].childNodes;
    expect(headingChildren.length).toBe(1);

    expect(queryByText('Bold Text')).toBeTruthy();
  });
});
