import React from 'react';

const About = (props) => {
  const { selectedGame } = props; 
  let content = '';
    if(selectedGame === 'MTG') {
      content = (<div className="footerLinks">
        <h1 className="text--left">ABOUT</h1>
        <h2 className="h2-margins">What is Name That Card: Magic Edition?</h2>
        <p className="p-margins">Name That Card: Magic Edition allows you to hone your knowledge of Magic The Gathering cards throughout the years. Upon starting, you will be presented with a card. An identifying portion of the card has been hidden. Select from one of the 4 card names below the card, and see if you can correctly identify that card. You are presented with 20 cards in total.</p>
    
        <h2 className="h2-margins">What is the difference between EASY, MEDIUM and HARD?</h2>
        <p className="p-margins">Some of us are more well-versed in the thousands of MTG cards than others. In order to make the experience enjoyable for everyone, you can select between easy, medium and hard. On the EASY setting, everything on the card will be visible except for the name on top. The 4 card name options on the EASY setting are completely random, from all editions of MTG. On the MEDIUM setting, both the image and function boxes are visible. The 4 card name options on the MEDIUM setting are all of the same type (e.g. creature, enchantment, etc.). On the HARD setting, everything on the card is blacked out except for the image. The 4 card name options on the HARD setting are both the same type and edition (e.g. Fourth Edition, Limited Edition Alpha, etc.)</p>
    
        <h2 className="h2-margins">How do I participate in the monthly card lottery?</h2>
        <p className="p-margins">If you correctly identify 18 out of each 20 cards presented to you, you will be presented with an opportunity to share your results on social media. A repopulated message will appear, which will include a unique identifier code. At the end of the month, we’ll randomly select one of these codes to determine a winner. You may enter as many times as you like, but only those who share their results, and the attached code, will be eligible for the drawing.</p>
    
        <h2 className="h2-margins">Who do I contact if I have questions, concerns, comments, or have spotted an error?</h2>
        <p className="p-margins">We welcome your feedback! Please reach out to us at <a href="mailto:info@namethatcard.com" target="_top">info@namethatcard.com</a></p>
      </div>)
    } else if (selectedGame === 'SPORTS') {
      content = (<div className="footerLinks">
        <h1 className="text--left">ABOUT</h1>
          <h2 className="h2-margins">What is Name That Card: Sports Edition?</h2>

          <p className="p-margins">Name That Card: Sports Edition allows you to test your knowledge of sports trading cards throughout the years. Upon starting, you will be presented with a card. An identifying portion of the card has been hidden. Select from one of the 4 card names below the card, and see if you can correctly identify that card. You are presented with 20 cards in total.</p>

          <h2 className="h2-margins">What is the difference between EASY, MEDIUM and HARD?</h2>

          <p className="p-margins">Some of us are more well-versed in the thousands of available sports cards than others. To test your skills, you can select between easy, medium and hard. On the EASY setting, all four card options are presented randomly. They may be from any sport and any year. On the MEDIUM setting, all four card options come from the same league and team. On the HARD setting, all four card options come from the same league, team and +/- 3 year time span.</p>

          <h2 className="h2-margins">Who do I contact if I have questions, concerns, comments, or have spotted an error?</h2>

          <p className="p-margins">We welcome your feedback! Please reach out to us at <a href="mailto:info@namethatcard.com" target="_top">info@namethatcard.com</a></p>
        </div>)
    }

  return (
    <div>
      {content}
    </div>
  );
};

export default About;
