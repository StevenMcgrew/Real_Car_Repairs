import './AboutPage.scoped.css';

import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className='page'>
      <h1 className="page-title">About Real Car Repairs</h1>
      <p className="about-p">    Real Car Repairs is a place for you to create your own vehicle repair documents. It was created because there is a real lack of quality repair information for professional automotive technicians, as well as the do-it-yourself community. Our goal is to provide an easy way to create your own documentation for your car repairs that you can save, view, and share.</p>
      <h3 className="about-h3">Why create your own repair documents?</h3>
      <p className="about-p">    There are two main groups of people that can benefit from creating their own documents:
        First, the "do-it-yourself" group of people can document the repairs they do to their vehicles and share it online with other people who have similar vehicles and need to do the same repair.  Plus, you can search and view other people’s repairs the next time you have a difficult repair to do. In this way, everyone benefits from seeing how to do a repair, and then they can do it themselves.
        Second, the professional automotive technician can create repair documents that are better than what they currently use. There are several problems with the service info that is currently available to automotive technicians. Let’s go ahead and list a few of them…</p>
      <ul>
        <li>
          <h4 className="li-h4">Incomplete or inaccurate info</h4>
          <p className="about-p">    Probably the biggest problem is incomplete or incorrect info. If you want to perform a repair on an unknown vehicle, it’s not great when the service manual leaves out a lot of information. Also, sometimes the info is just plain wrong. For example, when trying to locate components. You can waste a lot of time trying to locate a particular fuse, relay, or module, and the service manual tells you where it is, but guess what…the service manual was wrong! If you create your own documents, you won’t have this problem in the future.</p>
        </li>
        <li>
          <h4 className="li-h4">Time consuming</h4>
          <p className="about-p">    Another problem is the time it takes to look up all the relevant info for a particular repair. The main procedure might be in one section, then additional procedures are in another section, then the specs for certain things are in yet another section. If you create your own document, then all the info for a particular repair will be in one place, and you don’t have to waste time looking everything up again the next time around.</p>
        </li>
        <li>
          <h4 className="li-h4">Repeating mistakes</h4>
          <p className="about-p">    Unfortunately, sometimes people repeat common mistakes or there can be pitfalls to watch out for. Have you ever been in the middle of a repair and you accidentally made a mistake, then you think to yourself, “Wait a minute, didn’t I make that same mistake the last time I was doing this repair!” How does that happen? Because the last time you did that repair was 2 years ago and you can’t remember every single repair for years and years.</p>
          <p className="about-p">    How can you prevent making the same mistake over and over again? Document it! When you create your own repair documents, you can include warnings and reminders for what to watch out for. Never make the same mistake twice!</p>
        </li>
      </ul>
      <span className="outro">Thanks for reading. Now go <Link to={`/create`}>create</Link> some great repair documents!</span>

    </div>
  );
};

export default AboutPage;