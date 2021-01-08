import React, { Component } from 'react';

class MainPage extends Component {
  constructor() {
    super();
    // State needed
    this.state = {
      city: '',
      stateName: '',
      description: '',
      favorites: [],
      pressure: '',
      wind: '',
      humidity: '',
      temp: '',
      zip: '',
      showing: false,
    };
    //refs to clear form
    this.clear = React.createRef();

    //actions
    this.handleFormChange = this.handleFormChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handleFavorites = this.handleFavorites.bind(this);
    this.favClick = this.favClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  // async fetch function that parses the data into the state
  async onSearch(e) {
    e.preventDefault();

    //state deconstruction
    const { zip } = this.state;

    //basic validations
    if (zip.isNaN || zip.toString().length < 5) {
      alert('please eneter a 5 diget legal zip code');
      this.clearForm();
      return;
    }

    const response = await fetch(
      'http://api.openweathermap.org/data/2.5/weather?zip=' +
        zip +
        ',us&units=imperial&appid=655dfc390726be35679ee1f171b45301'
    );

    // checks to make sure that we recieve data from api
    if (!response.ok) {
      alert('please eneter a 5 diget legal zip code');
      this.clearForm();
      return;
    }
    // shows most of virtual dom on search
    this.setState({ showing: true });

    const data = await response.json();

    this.setState({
      city: data.name,
      description: data.weather[0].description,
      // Wasnt quite sure how to calculate pressure from api Data
      pressure: 'Pressure: ' + data.main.pressure,
      wind: 'Wind: ' + data.wind.speed + ' mph',
      humidity: 'Humidity: ' + data.main.humidity + '%',
      temp: Math.round(data.main.temp) + '°',
      stateName: this.getState(zip),
    });
    this.clearForm();
  }

  // function to get the state from the zipcode since its not on the api resposne
  getState(zipcode) {
    let state;
    if (zipcode >= 35000 && zipcode <= 36999) {
      state = 'Alabama';
    } else if (zipcode >= 99500 && zipcode <= 99999) {
      state = 'Alaska';
    } else if (zipcode >= 85000 && zipcode <= 86999) {
      state = 'Arizona';
    } else if (zipcode >= 71600 && zipcode <= 72999) {
      state = 'Arkansas';
    } else if (zipcode >= 90000 && zipcode <= 96699) {
      state = 'California';
    } else if (zipcode >= 80000 && zipcode <= 81999) {
      state = 'Colorado';
    } else if (
      (zipcode >= 6000 && zipcode <= 6389) ||
      (zipcode >= 6391 && zipcode <= 6999)
    ) {
      state = 'Connecticut';
    } else if (zipcode >= 19700 && zipcode <= 19999) {
      state = 'Delaware';
    } else if (zipcode >= 32000 && zipcode <= 34999) {
      state = 'Florida';
    } else if (
      (zipcode >= 30000 && zipcode <= 31999) ||
      (zipcode >= 39800 && zipcode <= 39999)
    ) {
      state = 'Georgia';
    } else if (zipcode >= 96700 && zipcode <= 96999) {
      state = 'Hawaii';
    } else if (zipcode >= 83200 && zipcode <= 83999) {
      state = 'Idaho';
    } else if (zipcode >= 60000 && zipcode <= 62999) {
      state = 'Illinois';
    } else if (zipcode >= 46000 && zipcode <= 47999) {
      state = 'Indiana';
    } else if (zipcode >= 50000 && zipcode <= 52999) {
      state = 'Iowa';
    } else if (zipcode >= 66000 && zipcode <= 67999) {
      state = 'Kansas';
    } else if (zipcode >= 40000 && zipcode <= 42999) {
      state = 'Kentucky';
    } else if (zipcode >= 70000 && zipcode <= 71599) {
      state = 'Louisiana';
    } else if (zipcode >= 3900 && zipcode <= 4999) {
      state = 'Maine';
    } else if (zipcode >= 20600 && zipcode <= 21999) {
      state = 'Maryland';
    } else if ((zipcode >= 1000 && zipcode <= 2799) || zipcode === 5501) {
      state = 'Massachusetts';
    } else if (zipcode >= 48000 && zipcode <= 49999) {
      state = 'Michigan';
    } else if (zipcode >= 55000 && zipcode <= 56899) {
      state = 'Minnesota';
    } else if (zipcode >= 38600 && zipcode <= 39999) {
      state = 'Mississippi';
    } else if (zipcode >= 63000 && zipcode <= 65999) {
      state = 'Missouri';
    } else if (zipcode >= 59000 && zipcode <= 59999) {
      state = 'Montana';
    } else if (zipcode >= 27000 && zipcode <= 28999) {
      state = 'North Carolina';
    } else if (zipcode >= 58000 && zipcode <= 58999) {
      state = 'North Dakota';
    } else if (zipcode >= 68000 && zipcode <= 69999) {
      state = 'Nebraska';
    } else if (zipcode >= 88900 && zipcode <= 89999) {
      state = 'Nevada';
    } else if (zipcode >= 3000 && zipcode <= 3899) {
      state = 'New Hampshire';
    } else if (zipcode >= 7000 && zipcode <= 8999) {
      state = 'New Jersey';
    } else if (zipcode >= 87000 && zipcode <= 88499) {
      state = 'New Mexico';
    } else if ((zipcode >= 10000 && zipcode <= 14999) || zipcode === 6390) {
      state = 'New York';
    } else if (zipcode >= 43000 && zipcode <= 45999) {
      state = 'Ohio';
    } else if (
      (zipcode >= 73000 && zipcode <= 73199) ||
      (zipcode >= 73400 && zipcode <= 74999)
    ) {
      state = 'Oklahoma';
    } else if (zipcode >= 97000 && zipcode <= 97999) {
      state = 'Oregon';
    } else if (zipcode >= 15000 && zipcode <= 19699) {
      state = 'Pennsylvania';
    } else if (zipcode >= 300 && zipcode <= 999) {
      state = 'Puerto Rico';
    } else if (zipcode >= 2800 && zipcode <= 2999) {
      state = 'Rhode Island';
    } else if (zipcode >= 29000 && zipcode <= 29999) {
      state = 'South Carolina';
    } else if (zipcode >= 57000 && zipcode <= 57999) {
      state = 'South Dakota';
    } else if (zipcode >= 37000 && zipcode <= 38599) {
      state = 'Tennessee';
    } else if (
      (zipcode >= 75000 && zipcode <= 79999) ||
      (zipcode >= 73301 && zipcode <= 73399) ||
      (zipcode >= 88500 && zipcode <= 88599)
    ) {
      state = 'Texas';
    } else if (zipcode >= 84000 && zipcode <= 84999) {
      state = 'Utah';
    } else if (zipcode >= 5000 && zipcode <= 5999) {
      state = 'Vermont';
    } else if (
      (zipcode >= 20100 && zipcode <= 20199) ||
      (zipcode >= 22000 && zipcode <= 24699) ||
      zipcode === 20598
    ) {
      state = 'Virgina';
    } else if (
      (zipcode >= 20000 && zipcode <= 20099) ||
      (zipcode >= 20200 && zipcode <= 20599) ||
      (zipcode >= 56900 && zipcode <= 56999)
    ) {
      state = 'Washington DC';
    } else if (zipcode >= 98000 && zipcode <= 99499) {
      state = 'Washington';
    } else if (zipcode >= 24700 && zipcode <= 26999) {
      state = 'West Virginia';
    } else if (zipcode >= 53000 && zipcode <= 54999) {
      state = 'Wisconsin';
    } else if (zipcode >= 82000 && zipcode <= 83199) {
      state = 'Wyoming';
    } else {
      state = 'none';
      console.log('No state found matching', zipcode);
    }
    return state;
  }

  //getting form data
  handleFormChange(e) {
    this.setState({ zip: e.target.value }, () => {});
  }

  // populating the favorites list
  handleFavorites() {
    const { city, stateName, zip, favorites } = this.state;
    let num = favorites.length;
    let arr = [city, stateName, zip, num];
    let arr2 = favorites;

    arr2.push(arr);
    this.setState({ favorites: arr2 }, () => {});
  }

  // reloading specific zipcode from favorites list using async fetch
  async favClick(e) {
    e.preventDefault();
    const { favorites } = this.state;
    let zip = favorites[e.currentTarget.id][2];
    const response = await fetch(
      'http://api.openweathermap.org/data/2.5/weather?zip=' +
        zip +
        ',us&units=imperial&appid=655dfc390726be35679ee1f171b45301'
    );
    const data = await response.json();

    this.setState(
      {
        city: data.name,
        description: data.weather[0].description,
        // Wasnt quite sure how to calculate pressure from api Data
        pressure: 'Pressure: ' + data.main.pressure,
        wind: 'Wind: ' + data.wind.speed + ' mph',
        humidity: 'Humidity: ' + data.main.humidity + '%',
        temp: Math.round(data.main.temp) + '°',
        stateName: this.getState(zip),
      },
      () => {}
    );
  }

  // handles deleting item from favorites list
  onDelete(e) {
    e.preventDefault();
    const { favorites } = this.state;
    let arr = favorites;
    arr.splice(e.currentTarget.id, 1);
    this.setState({ favorites: arr }, () => {});
  }

  //clears the form
  clearForm() {
    this.clear.current.value = '';
  }

  render() {
    const {
      stateName,
      city,
      wind,
      temp,
      pressure,
      description,
      humidity,
      favorites,
      showing,
    } = this.state;
    return (
      <div>
        <div className='container'>
          <nav
            className='navbar navbar-expand-lg navbar-light bg-light'
            style={{}}
          >
            <button
              className='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#navbarSupportedContent'
              undefined
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon' />
            </button>
            <div
              className='collapse navbar-collapse'
              id='navbarSupportedContent'
            >
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item active' />
                <li className='nav-item' />
                <li className='nav-item' />
              </ul>
              <form
                className='form-inline my-2 my-lg-0'
                _lpchecked={1}
                id='mainInput'
              >
                <input
                  className='form-control mr-sm-2'
                  type='text'
                  placeholder='Zip Code'
                  aria-label='Zip Code'
                  maxLength='5'
                  onChange={this.handleFormChange}
                  ref={this.clear}
                />
                <button
                  className='btn btn-outline-success my-2 my-sm-0'
                  type='submit'
                  onClick={this.onSearch}
                >
                  Search
                </button>
              </form>
            </div>
          </nav>

          {/* Hide footer until search bar used */}

          {showing ? (
            <footer className='footer'>
              <ul className='list-group' style={{}}>
                {/* mapping favorites array onto virtual dom  */}
                {favorites.map((favorites, index) => {
                  return (
                    <div>
                      <button
                        className='list-group-item list-group-item-action'
                        onClick={this.favClick}
                        id={index}
                        style={{ width: '80%', display: 'inline-block' }}
                      >
                        {favorites[0]} {favorites[1]}
                      </button>
                      <button
                        className='btn btn-default'
                        style={{
                          display: 'inline-block',
                          width: '20%',

                          float: 'right',
                          height: '3.1rem',
                        }}
                        onClick={this.onDelete}
                        id={index}
                      >
                        X
                      </button>
                    </div>
                  );
                })}
              </ul>
              <div className='card' style={{ marginTop: 30 }}>
                <div className='card' style={{ marginTop: 0 }}>
                  <div className='card-body' style={{ marginTop: 0 }}>
                    <h4 className='card-title'>
                      <b>
                        {city} {stateName}
                      </b>
                    </h4>
                    <div className='row' style={{}}>
                      <div className='col-sm-4'>
                        <h1>{temp}</h1>
                        <h6 style={{}}>{description}</h6>
                      </div>
                      <div className='col-sm-4 col-5'></div>
                      <div className='col-sm-4'>
                        <h5 style={{}}>{pressure}</h5>
                        <h5 style={{}}>{humidity}</h5>
                        <h5 style={{}}>{wind}</h5>
                        <div className='row' style={{}}>
                          <div className='col-sm-4' />
                          <div className='col-sm-4 col-5' />
                          <div className='col-sm-4' />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={this.handleFavorites}
                      className='btn btn-primary'
                    >
                      Add to favorites
                    </button>
                  </div>
                </div>
              </div>{' '}
              © Firstly NodeJS 2021
              <p />
            </footer>
          ) : null}
        </div>
      </div>
    );
  }
}

export default MainPage;
