// import { Link } from "react-router-dom";
import "./home.css"
import adoptTree from "../../assets/adopt-a-tree-image-front.png"
import kids from "../../assets/Native_women-planting.jpg"
import industrial from "../../assets/industrial_image.jfif"
import researcher from "../../assets/agriculture-plant-science-technology-research-development-concept.jpg"
import features from "../../assets/feature.jfif"
import climateChange from "../../assets/Effects-tryptich.jpg"
import deForest from "../../assets/deforestation-forest-wood-logging.jpg"
import deForest2 from "../../assets/land-tenure-drives-def.jpg"
import planting from  "../../assets/Arbor-Day-tree-planting.jpg"
import React from "react";
import YoutubeEmbed from "../../components/youtube_embed/YTembed"
import iceberg from "../../assets/iceberg_breaking.jpg"
import barGraph from "../../assets/bar_graph.png"
import youthMovement from "../../assets/GenerationsAndClimate_featured.jpg"
import womanPhone from "../../assets/woman_using_phone.jpg"
import oldman from "../../assets/Old_person_using_laptop.jpg"
const Home = () => {
    return (
<main>

<div id="myCarousel" className="carousel slide shadow bg-body mb-5 rounded" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <svg className="bd-placeholder-img" width="100%" height="100%"  aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
        <rect width="100%" height="100%" fill="white"/><image href={adoptTree} height="100%" width="100%"/>
      </svg>

      <div className="container">
        <div className="carousel-caption text-start">
        </div>
      </div>
    </div>
    <div className="carousel-item">
      <svg className="bd-placeholder-img" width="100%" height="100%"  aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
        <rect width="100%" height="100%" fill="white"/><image href={planting} height="100%" width="100%" />
      </svg>

      <div className="container">
        <div className="carousel-caption">
          <h1 className="fw-bold ">Adopt a tree and help save Mother Earth</h1>
          {/* <p>Some representative placeholder content for the second slide of the carousel.</p> */}
          <p><a className="btn btn-lg btn-primary" href="#">Learn more</a></p>
        </div>
      </div>
    </div>
    <div className="carousel-item">
      <svg className="bd-placeholder-img" width="100%" height="100%" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
        <rect width="100%" height="100%" fill="white"/><image href={kids} height="100%" width="100%" />
      </svg>

      <div className="container">
        <div className="carousel-caption">
          <h1>Together we can heal the Earth</h1>
          <p></p>
          {/* <p><a className="btn btn-lg btn-primary" href="#">Browse gallery</a></p> */}
        </div>
      </div>
    </div>
    <div className="carousel-item">
      <svg className="bd-placeholder-img" width="100%" height="100%" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
        <rect width="100%" height="100%" fill="white"/><image href={deForest2} height="100%" width="100%" />
      </svg>

      <div className="container">
        <div className="carousel-caption">
          <h1>Replenish the Earth by adopting a tree</h1>
          <p></p>
          <p><a className="btn btn-lg btn-primary" href="/register">Sign Up Now</a></p>
        </div>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

 {/* Marketing messaging and featurettes
  ==================================================
 Wrap the rest of the page in another container to center all the content. */}

  <div className="container marketing">

    {/* <!-- Three columns of text below the carousel --> */}
    <div className="row">
      <div className="col-lg-4">
        <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
          <title>Placeholder</title><rect width="100%" height="100%" fill="#777"/>
          <image href={industrial} height="100%" width="100%" />
        </svg>

        <h2>The Problem</h2>
        <p>All of us should be aware and take responsibility of our environment and this should help.</p>
        <p><a className="btn btn-secondary" href="#problem">View details &raquo;</a></p>
      </div>
      <div className="col-lg-4">
        <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
          <title>Placeholder</title><rect width="100%" height="100%" fill="#777"/>
          <image href={researcher} height="100%" width="100%" />
        </svg>

        <h2>Our Goals</h2>
        <p>Here where the vision and mission lies for this project unto what motivates our desire to save the Earth.</p>
        <p><a className="btn btn-secondary" href="#goals">View details &raquo;</a></p>
      </div>
      <div className="col-lg-4">
        <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
          <title>Placeholder</title><rect width="100%" height="100%" fill="#777"/>
          <image href={features} height="100%" width="100%" />
        </svg>

        <h2>Features</h2>
        <p>Every feature is a weapon towards helping the environment to achieve our goals and grow trees responsibly.</p>
        <p><a className="btn btn-secondary" href="#features">View details &raquo;</a></p>
      </div>
    </div>

    {/* <!-- START THE FEATURETTES --> */}

    <hr className="featurette-divider"/>

<div id="problem" className="row featurette">
  <div className="col-md-7 order-md-2">
    <h2 className="featurette-heading">Global climate change <span className="text-muted">is not a future problem.</span></h2>
    <p className="lead">
    Changes to Earth’s climate driven by increased human emissions of heat-trapping greenhouse gases are already having widespread effects on the environment: glaciers and ice sheets are shrinking, river and lake ice is breaking up earlier, plant and animal geographic ranges are shifting, and plants and trees are blooming sooner.
    </p>
    <p className="lead">
    Effects that scientists had long predicted would result from global climate change are now occurring, such as sea ice loss, accelerated sea level rise, and longer, more intense heat waves.
    </p>
  </div>
  <div className="col-md-5 order-md-1">
    <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false">
      <title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><image href={climateChange} height="100%" width="100%" />
      </svg>

  </div>
</div>

    <hr className="featurette-divider"/>

<div className="row featurette">
{/* <YoutubeEmbed embedId="Ic-J6hcSKa8" /> */}

  <div className="col-md-7">
    <h2 className="featurette-heading">Our environment <span className="text-muted">is really deteriorating and almost on the verge of collapse </span></h2>
    <p className="lead">Environmental degradation is the disintegration of the earth or deterioration of the environment through the consumption of assets, for example, air, water and soil; the destruction of environments and the eradication of wildlife. It is characterized as any change or aggravation to nature’s turf seen to be pernicious or undesirable. 
    </p>
    <p className="lead">Ecological effect or degradation is created by the consolidation of an effectively substantial and expanding human populace, constantly expanding monetary development or per capita fortune and the application of asset exhausting and polluting technology. 
    </p>
  </div>
  <div className="col-md-5">
    <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false">
      <title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><image href={deForest} height="100%" width="100%" />
    </svg>
  </div>
</div>

<hr className="featurette-divider"/>

<div className="row featurette">
  <div className="col-md-7 order-md-2">
    <h2 className="featurette-heading">Melting Permafrost is natural. <span className="text-muted">However, it is accelerated exceeedingly over the balance of nature by global warming.</span></h2>
    <p className="lead">
      Permafrost is frozen soil that has environmental gases trapped in it for several years and is present below Earth’s surface. It is present in glaciers. As the permafrost melts, it releases the gases back into the atmosphere, increasing Earth’s temperature.
    </p>
    <p className="lead">
      "In 2013, the Intergovernmental Panel for Climate Change reported that the increase in the global temperature between 1880 and 2012 has been 0.9 degrees Celsius. The increase is 1.1 degrees Celsius when compared to the pre-industrial mean temperature."

      -Intergovernmental Panel for Climate Change
    </p>
  </div>
  <div className="col-md-5 order-md-1">
    <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false">
      <title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><image href={iceberg} height="100%" width="100%" />
      </svg>

  </div>
</div>

<hr className="featurette-divider"/>

<div className="row featurette">
  <div className="col-md-7">
    <h2 className="featurette-heading">Deforestation <span className="text-muted"></span></h2>
    <p className="lead">
    Plants are the main source of oxygen. They take in carbon dioxide and release oxygen thereby maintaining environmental balance. Forests are being depleted for many domestic and commercial purposes. This has led to an environmental imbalance, thereby giving rise to global warming.
    </p>
  </div>

  <div className="col-md-5">
    <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false">
      <title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><image href={barGraph} height="100%" width="100%" />
      </svg>

  </div>
</div>
<YoutubeEmbed embedId="vJnnrpSDWPI" />
<hr className="featurette-divider"/>

<div className="row featurette">
  <div className="col-md-7 order-md-2">
    <h2 className="featurette-heading">The Youth <span className="text-muted">could be the hope in these times.</span></h2>
    <p className="lead">
      In recent years, there has been a lot of interest specially millennials and gen-z these days to protect and preserve the environment; and one way we can do that is planting trees.
    </p>
    <p className="lead">
      However, most of us don't have the experience or the time to go out and plant it ourselves. So therefore, Most youngsters nowadays just don't know how to plant.
    </p>
    <p className="lead">
    some may know how to plant and willingly wants to plant but they just don't have the time for it, since they are busy with other things such as work, school, business, priorities in a family and etcetera.
    </p>
  </div>
  <div className="col-md-5 order-md-1">
    <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false">
      <title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><image href={youthMovement} height="100%" width="100%" />
      </svg>
  </div>
</div>

<hr className="featurette-divider"/>

<div id="goals" className="row featurette">
  <div className="col-md-7">
    <h2 className="featurette-heading">With the right innovations <span className="text-muted">solutions are found</span></h2>
    <li className="lead">
    An app where people could connect, adopt, and buy tree/s and that would help you plant trees.
    </li>
    <br/>
    <li className="lead">
    This app will connect you with planters that knows how to plant and also for those starting to plant; in which are willing to plant for the environment and gain at least a small profit.
    </li>
  </div>
  <div className="col-md-5">
    <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false">
      <title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><image href={womanPhone} height="100%" width="100%" />
      </svg>
  </div>
</div>

<hr className="featurette-divider"/>

<div id="features" className="row featurette">
  <div className="col-md-7 order-md-2">
    <h2 className="featurette-heading">Features, <span className="text-muted">the tools that drive the solutions.</span></h2>
    <li className="lead">
      A registration feature you can choose either as a planter or a contributor/sponsor
    </li>
    <br/>
    <li className="lead">
      Timeline feature where spnsors and planters could post.
    </li>
    <br/>
    <li className="lead">
    A contributor/sponsor can choose a minimum of ₱100 or any amount will do depending on their transaction through a messenger.
    </li>
    <br/>
    <li className="lead">
    Updates the contributor by the planter on the status of the planted tree/s. And many more to come...
    </li>
  </div>
  <div className="col-md-5 order-md-1">
    <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false">
      <title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><image href={oldman} height="100%" width="100%" />
      </svg>
  </div>
</div>

<hr className="featurette-divider"/>
</div>

{/* <!-- FOOTER --> */}
  <footer className="container">
    <p className="float-end"><a href="#">Back to top</a></p>
    <p>&copy; 2022 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
  </footer>
</main>
    )
}

export default Home;