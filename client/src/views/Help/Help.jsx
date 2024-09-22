import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import mo from "@assets/images/mo.jfif";
import kiro from "@assets/images/kiro.jfif";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPageName } from "@store/toolsbar/toolsbarSlice";
import "./Help.scss";

function Help() {
  const dispatch = useDispatch();
  const developers = [
    {
      id: 2,
      name: "Kirollos Atef",
      jopTitle: "Software Engineer",
      contacts: {
        whatsapp: "+201032892585",
        linkedIn: "kirollos-atef-fawze",
      },
      photo: kiro,
    },
    {
      id: 1,
      name: "Mohammed Ramadan",
      jopTitle: "Full-Stack Developer",
      contacts: {
        whatsapp: "+201121090068",
        linkedIn: "mohammed-ramadan-1374771b7",
      },
      photo: mo,
    },
  ];

  useEffect(() => {
    dispatch(setPageName("help"));
  }, []);

  return (
    <div className="help">
      <div className="help-developers">
        {developers.map((item) => (
          <div key={item.id} className="help-developers-dev">
            <div className="help-developers-dev-img">
              <img src={item.photo} alt="photo" />
            </div>
            <div className="help-developers-dev-name">{item?.name} </div>
            <div className="help-developers-dev-jopTitle">{item.jopTitle} </div>
            <div className="help-developers-dev-contactUs">
              <a
                href={`https://wa.me/${item.contacts.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="help-developers-dev-contactUs-item">
                <div className="flex-center">
                  <WhatsAppIcon sx={{ fontSize: 25 }} />
                </div>
              </a>
              <a
                href={`https://www.linkedin.com/in/${item.contacts.linkedIn}`}
                target="_blank"
                rel="noopener noreferrer"
                className="help-developers-dev-contactUs-item">
                <div className="flex-center">
                  <LinkedInIcon sx={{ fontSize: 25 }} />
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Help;
