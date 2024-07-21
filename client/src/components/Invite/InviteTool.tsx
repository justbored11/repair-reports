// import useInviteManager from "../../hooks/useInviteManager";

import { useState } from "react";
import { Form } from "react-router-dom";
import CreatableSelect from "react-select/creatable";

export type GroupOptionT = {
  id: string;
  name: string;
};

type InviteToolProps = {
  availableGroups?: GroupOptionT[];
  onPostInvite: (groupIds: string[], password?: string) => Promise<void>;
};

export default function InviteTool({
  availableGroups,
  onPostInvite,
}: InviteToolProps) {
  return (
    <section className="relative p-2 border rounded-lg border-blue-600">
      <div>
        <div>
          <InviteForm
            onSubmit={(groupIds: string[], password: string) => {
              onPostInvite(groupIds, password);
            }}
            groupOptions={availableGroups}
          />
        </div>
      </div>
    </section>
  );
}

type CreateInviteFormPropsT = {
  groupOptions?: GroupOptionT[];
  onSubmit: (groupIds: string[], password: string) => void;
};

function InviteForm({ groupOptions = [], onSubmit }: CreateInviteFormPropsT) {
  //create options for creatable select to use
  const options = groupOptions.map((option) => {
    return { label: option.name, value: option.id };
  });

  //group ids selected
  const [groupIds, setGroupIds] = useState<string[]>([]);
  const [password] = useState("");

  return (
    <Form className="flex flex-wrap relative">
      <div>
        <label className="form-control w-full h-[70px]">
          <div className="label">
            <span className="label-text">Invite Password</span>
            {/* <span className="label-text-alt">Optional</span> */}
          </div>
          <input
            type="text"
            onChange={(event) => {
              console.log("password", event.target.value);
            }}
            placeholder="Optional password"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
      </div>

      <div>
        {!options.length && (
          <div className="btn btn-disabled">You dont have invite access</div>
        )}
        {Boolean(options.length) && (
          <label className="form-control w-full max-w-xs h-full">
            <div className="label">
              <span className="label-text">Pick group</span>
            </div>
            <CreatableSelect
              placeholder={"Select group"}
              isMulti
              className="w-44 h-full"
              // defaultValue={defaultValue ? defaultValue : options[0]}
              isClearable
              onChange={(options) => {
                // if (callback) callback(options);
                const groupIds = options.map((tagObj) => {
                  return tagObj.value;
                });
                // console.log("groupIds", groupIds);
                setGroupIds(groupIds);

                return;
              }}
              options={options}
            />
          </label>
        )}
      </div>
      <div className="btn btn-sm absolute right-0">
        <div
          onClick={() => {
            if (onSubmit) {
              onSubmit(groupIds, password);
            }
          }}>
          create invite +
        </div>
      </div>
    </Form>
  );
}
