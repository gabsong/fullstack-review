import React from 'react';
import Repo from './Repo.jsx';


const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div>
    {(props.repos).map((repo, i) => (<Repo key={i} repo={repo} />))}
    </div>
  </div>
)

export default RepoList;