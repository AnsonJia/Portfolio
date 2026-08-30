import { Link } from 'react-router-dom';
import { Mouse } from 'lucide-react';
import './ScrollHint.scss';

export default function ScrollHint() {
  return (
    <Link
      to="/explore"//path link to explore
      className="scroll-hint mouse-md d-flex"
    >
      <span className="d-none d-md-inline-block">
        Scroll to Explore
      </span>

      <span className="d-inline-block d-md-none">
        Tap to Explore -&gt;
      </span>

      <span>
      <Mouse
        size={30}
        color="white"
      />
      </span>
      
    </Link>
  );
}