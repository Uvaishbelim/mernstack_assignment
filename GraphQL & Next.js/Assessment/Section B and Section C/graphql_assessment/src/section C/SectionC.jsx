import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import LinkCard from './LinkCard';
import './sectionC.css';

const GET_PROFILE = gql`
  query GetProfile {
    profile {
      name
      bio
    }
  }
`;

const GET_LINKS = gql`
  query GetLinks {
    links {
      id
      title
      url
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: ProfileInput!) {
    updateProfile(input: $input) {
      name
      bio
    }
  }
`;

const ADD_LINK = gql`
  mutation AddLink($input: LinkInput!) {
    addLink(input: $input) {
      id
      title
      url
    }
  }
`;

const SectionC = () => {
  const { data: profileData, loading: profileLoading, error: profileError } = useQuery(GET_PROFILE);
  const { data: linksData, loading: linksLoading, error: linksError } = useQuery(GET_LINKS);
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [addLink] = useMutation(ADD_LINK);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (profileLoading || linksLoading) {
    return <div className="section-c-shell">Loading...</div>;
  }

  if (profileError || linksError) {
    return <div className="section-c-shell">Unable to load profile data.</div>;
  }

  const profile = profileData?.profile || { name: '', bio: '' };
  const links = linksData?.links || [];

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!name.trim() && !bio.trim()) {
      setErrorMessage('Add a name or bio to update your profile.');
      return;
    }

    try {
      await updateProfile({
        variables: {
          input: {
            name: name.trim() || profile.name,
            bio: bio.trim() || profile.bio,
          },
        },
      });
      setName('');
      setBio('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleAddLink = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    const title = linkTitle.trim();
    const url = linkUrl.trim();
    const urlPattern = /^(https?:\/\/)[^\s]+$/i;

    if (!title || !url) {
      setErrorMessage('Both title and URL are required.');
      return;
    }

    if (!urlPattern.test(url)) {
      setErrorMessage('Please enter a valid URL starting with http:// or https://');
      return;
    }

    try {
      await addLink({
        variables: {
          input: {
            title,
            url,
          },
        },
      });
      setLinkTitle('');
      setLinkUrl('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="section-c-shell">
      <div className="section-c-header">
        <div className="profile-card">
          <h1>{profile.name || 'Creator Name'}</h1>
          <p>{profile.bio || 'Update your profile details to tell your story and connect with your audience.'}</p>
        </div>

        <form className="profile-editor" onSubmit={handleProfileSubmit}>
          <h2>Edit Profile</h2>
          <label htmlFor="creator-name">Name</label>
          <input
            id="creator-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={profile.name || 'Enter your name'}
          />

          <label htmlFor="creator-bio">Bio</label>
          <textarea
            id="creator-bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            placeholder={profile.bio || 'Write your bio here'}
          />

          <div className="button-row">
            <button type="submit" className="primary-button">
              Save Profile
            </button>
          </div>
        </form>
      </div>

      <section className="links-panel">
        <div className="links-heading">
          <div>
            <h2>Links & Projects</h2>
            <p>Connect your audience with your top work and social destinations.</p>
          </div>
        </div>

        <form className="link-form" onSubmit={handleAddLink}>
          <label htmlFor="link-title">Link Title</label>
          <input
            id="link-title"
            value={linkTitle}
            onChange={(event) => setLinkTitle(event.target.value)}
            placeholder="Example: Portfolio, Instagram, Blog"
          />

          <label htmlFor="link-url">Link URL</label>
          <input
            id="link-url"
            value={linkUrl}
            onChange={(event) => setLinkUrl(event.target.value)}
            placeholder="https://your-link.com"
          />

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="button-row">
            <button type="submit" className="primary-button">
              Add Link
            </button>
          </div>
        </form>

        <div className="links-grid">
          {links.length === 0 ? (
            <div className="empty-state">
              <h3>No links yet</h3>
              <p>Add your first link to build your creator bio stack.</p>
            </div>
          ) : (
            links.map((link) => (
              <LinkCard key={link.id} title={link.title} url={link.url} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default SectionC;
