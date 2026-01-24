import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Props, defaultData } from "./types";
import { DebounceInput } from "../../shared";
import { backgroundMessages } from "../../../locales/messages";
import BaseSettings from "../base/BaseSettings";

const GiphySettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="GiphySettings">
    <BaseSettings
      data={data}
      setData={setData}
      title={
        <FormattedMessage
          id="backgrounds.giphy.showNewGif"
          defaultMessage="Show a new GIF"
        />
      }
    />
    <label>
      <FormattedMessage
        id="backgrounds.giphy.tag"
        defaultMessage="Tag"
        description="Tag title"
      />
      <DebounceInput
        type="text"
        value={data.tag}
        onChange={(value) => setData({ ...data, tag: value })}
        wait={500}
      />
    </label>
    <p className="info">
      <FormattedMessage
        id="backgrounds.giphy.tag.info"
        defaultMessage="Separate multiple tags with a comma"
        description="Tag info"
      />
    </p>

    <label>
      <input
        type="checkbox"
        checked={data.nsfw}
        onChange={() => setData({ ...data, nsfw: !data.nsfw })}
      />{" "}
      <FormattedMessage
        id="backgrounds.giphy.safeSearch"
        defaultMessage="Include NSFW content"
        description="Include NSFW content checkbox label"
      />
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.showTitle}
        onChange={() => setData({ ...data, showTitle: !data.showTitle })}
      />{" "}
      <FormattedMessage {...backgroundMessages.showTitle} />
    </label>
  </div>
);

export default GiphySettings;
