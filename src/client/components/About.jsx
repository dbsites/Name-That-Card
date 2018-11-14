import React from 'react';

const About = () => {
  return (
    <div className="footerLinks">
      <h1 className="footerCenter">ABOUT</h1>
      <br />
      <div>
        <ol>
          <li>
            <h2>What is Name That Card: Magic Edition?</h2>
            <p>Name That Card: Magic Edition allows you to hone your knowledge of Magic The Gathering cards throughout the years. Upon starting, you will be presented with a card. An identifying portion of the card has been hidden. Select from one of the 4 card names below the card, and see if you can correctly identify that card. You are presented with 20 cards in total.</p>
          </li>
          <li>
            <h2>What is the difference between EASY, MEDIUM and HARD?</h2>
            <p>Some of us are more well-versed in the thousands of MTG cards than others. In order to make the experience enjoyable for everyone, you can select between easy, medium and hard. On the EASY setting, everything on the card will be visible except for the name on top. The 4 card name options on the EASY setting are completely random, from all editions of MTG. On the MEDIUM setting, both the image and function boxes are visible. The 4 card name options on the MEDIUM setting are all of the same type (e.g. creature, enchantment, etc.). On the HARD setting, everything on the card is blacked out except for the image. The 4 card name options on the HARD setting are both the same type and edition (e.g. Fourth Edition, Limited Edition Alpha, etc.)</p>
          </li>
          <li>
            <h2>How do I participate in the monthly card lottery?</h2>
            <p>If you correctly identify 18 out of each 20 cards presented to you, you will be presented with an opportunity to share your results on social media. A repopulated message will appear, which will include a unique identifier code. At the end of the month, we’ll randomly select one of these codes to determine a winner. You may enter as many times as you like, but only those who share their results, and the attached code, will be eligible for the drawing.</p>
          </li>
          <li>
            <h2>Who do I contact if I have questions, concerns, comments, or have spotted an error?</h2>
            <p>We welcome your feedback! Please reach out to us at info@namethatcard.com</p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default About;
