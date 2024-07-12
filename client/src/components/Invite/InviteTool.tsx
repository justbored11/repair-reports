// import useInviteManager from "../../hooks/useInviteManager";

import { useState } from "react";
import { Form } from "react-router-dom";
import CreatableSelect from "react-select/creatable";

export type GroupOptionT = {
  id: string;
  name: string;
};

//TODO remove test and use hook
const TestAvailableGroups = [
  { id: "66906fdfaf083055ee5677a1", name: "cata" },
  { id: "12d3", name: "another group" },
  { id: "1dfadf4533", name: "another group" },
  { id: "12dfag33", name: "another group" },
  { id: "122222533", name: "another group" },
  { id: "99999533", name: "another group" },
  { id: "100004533", name: "another group" },
  { id: "13423543", name: "another group" },
];

type InviteToolProps = {
  availableGroups?: GroupOptionT[];
  onPostInvite: (groupIds: string[], password?: string) => Promise<void>;
};

export default function InviteTool({
  availableGroups = TestAvailableGroups,
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
  const options = groupOptions.map((option) => {
    return { label: option.name, value: option.id };
  });

  const [groupIds, setGroupIds] = useState<string[]>([]);
  const [password] = useState("");

  return (
    <Form className="flex flex-wrap relative">
      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Invite Password</span>
            <span className="label-text-alt">Optional</span>
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
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Pick group</span>
          </div>
          <CreatableSelect
            isMulti
            className=" w-full"
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
