import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faBrain, faPoll, faDrawPolygon, faCode, faEye, faInfinity, faGhost, faWaveSquare,faStoreAlt, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faTwitter, faLinkedinIn, faVimeo } from "@fortawesome/free-brands-svg-icons";

export default function icons() {
    library.add(
        faEnvelope,
        faBrain, 
        faPoll, 
        faDrawPolygon, 
        faCode, 
        faEye, 
        faInfinity, 
        faGhost, 
        faWaveSquare,
        faGithub, 
        faStoreAlt, 
        faUserSecret, 
        faTwitter, 
        faLinkedinIn, 
        faVimeo 
    );

    dom.watch();
}