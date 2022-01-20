/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import Card from './index';
import styles from './Card.module.css';

describe('Card', () => {
  it('Renders the correct content', () => {
    const { container, queryByText } = render(<Card
      date="2000-1-1"
      title="Title"
      explanation="Explanation"
      media_type="image"
      url="/public/apple-touch-icon.png"
    />);

    const content = container.getElementsByClassName(styles.content);
    expect(content[0].childNodes.length).toBe(3);

    expect(queryByText('Title')).toBeTruthy();
    expect(queryByText('Explanation')).toBeTruthy();
    expect(queryByText('2000-1-1')).toBeTruthy();
  });
});
