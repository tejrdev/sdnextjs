import Dailernewschart from '@/components/NewsLetter/Dailernewschart';
import Link from 'next/link';
import { FiInfo } from 'react-icons/fi';

const NewOpening = ({ item }) => {
  return (
    <div className='new-openings-sec'>
      <h2>NEW OPENINGS</h2>
      <div className='new-openings--inner'>
        <div className='new-openings--listing'>
          {item.new_opening_movies.map((opening, ind) => {
            return (
              <div className='newsltrlisting df' key={ind}>
                <div className='newltropeningbox df'>
                  <figure className='pvr'>
                    <Link href={opening.link}>
                      <img className='objimg' src={opening.img} alt='' />
                    </Link>
                  </figure>
                  <div className='new-openings-cnt'>
                    <h3>
                      <Link href={opening.link}>{opening.title + ' (' + opening.distributor + ')'}</Link>
                    </h3>
                    <ul>
                      <li>
                        <p>
                          <span>{opening.rating}</span> | <span>{opening.runtime}</span> | <span>{opening.genre}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          Opening Weekend Est.: <strong>{opening.opening_estimate}</strong>
                        </p>
                      </li>
                      <li>
                        <p>
                          Total Est.: <strong>{opening.total_estimate}</strong>
                        </p>
                      </li>
                      <li>
                        <p>
                          Locations Est: <strong>{opening.locations}</strong>
                        </p>
                      </li>
                      {opening.rotten_tomatoes && (
                        <li>
                          <p>
                            RT Critics Score: <strong>{opening.rotten_tomatoes}</strong>
                          </p>
                        </li>
                      )}
                    </ul>
                    {opening.notes && <p>Notes: {opening.notes}</p>}
                  </div>
                </div>
                <div className='newsltrchartinfo'>
                  <h3 className='text-center'>The Charts</h3>
                  <div className='newschartbox df fww'>
                    <div className='newsltrfilmchart'>
                      <Dailernewschart score={78} height={200} />
                      <p className='text-center'>
                        <strong>Sizzle Score</strong>
                        <span className='inforound' title='Sizzle Score'>
                          <FiInfo />
                        </span>
                      </p>
                    </div>
                    <div className='newsltrfilmchart'>
                      <Dailernewschart score={38} height={200} />
                      <p className='text-center'>
                        <strong>Advance Tickets</strong>
                        <span className='inforound' title='Advance Tickets'>
                          <FiInfo />
                        </span>
                      </p>
                    </div>
                    <div className='newsltrfilmchart'>
                      <Dailernewschart score={51} height={200} />
                      <p className='text-center'>
                        <strong>Awareness</strong>
                        <span className='inforound' title='Awareness'>
                          <FiInfo />
                        </span>
                      </p>
                    </div>
                    <div className='newsltrfilmchart'>
                      <Dailernewschart score={18} height={200} />
                      <p className='text-center'>
                        <strong>Interest</strong>
                        <span className='inforound' title='Interest'>
                          <FiInfo />
                        </span>
                      </p>
                    </div>
                    <div className='newschartcolor w100'>
                      <ul className='df fww'>
                        <li>
                          <span style={{ background: '#01BBE1' }}></span> 0-20
                        </li>
                        <li>
                          <span style={{ background: '#FFE434' }}></span> 20-50
                        </li>
                        <li>
                          <span style={{ background: '#EE8C1C' }}></span> 50-90
                        </li>
                        <li>
                          <span style={{ background: '#E93100' }}></span> 90-100
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewOpening;
